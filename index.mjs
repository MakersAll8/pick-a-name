import { DynamoDBClient, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";

const dynamodbClient = new DynamoDBClient({});
const tableName = 'db-pick-a-name';

export async function handler(_event) {
    try {
        const getItemCommand = new GetItemCommand({
            TableName: tableName,
            Key: { teamName: { S: 'myTeam' } }
        });

        const getItemResponse = await dynamodbClient.send(getItemCommand);
        const teamMembers = getItemResponse.Item.teamMembers.SS;
        const picked = getItemResponse.Item?.picked?.SS || [];
        const teamsChannelUrl = getItemResponse.Item.teamsChannelUrl.S;
        
        const haveNotBeenPicked = teamMembers.filter(member => !picked.includes(member));
        const isNewRound = haveNotBeenPicked.length === 0;     
        const toBePicked =  isNewRound ? teamMembers : haveNotBeenPicked;
        
        const randomIndex = Math.floor(Math.random() * toBePicked.length);
        const winner = toBePicked[randomIndex];
        

        const newPicked = isNewRound ? [winner] : [...picked, winner];
        const resetNamesCommand = new PutItemCommand({
            TableName: tableName,
            Item: { teamName: { S: 'myTeam' }, teamMembers: { SS: teamMembers }, picked: {SS: newPicked}, teamsChannelUrl: {S: teamsChannelUrl} }
        });
        await dynamodbClient.send(resetNamesCommand);

        await sendMessage(teamsChannelUrl, winner);
  
        return {
          statusCode: 200,
          body: `winner is ${winner}`
        }
        
        
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'An error occurred' })
        };
    }
}

async function sendMessage(url, winner) {
    const teamsMessage = {
        "Summary": "Stand Up Facilitator Winner",
        "Text": `${winner} is running the show today`
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(teamsMessage)
    };

    try {
        const response = await fetch(url, options);
        const data = await response.text();
        console.log('Message sent successfully:', data);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}