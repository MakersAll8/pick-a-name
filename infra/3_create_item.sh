teamsChannelUrl="<your teams channel connector url>"
teamName="myTeam"
tableName="db-pick-a-name"

aws dynamodb put-item \
  --table-name "$tableName" \
  --item '{
    "teamName": {"S": "'"$teamName"'"},
    "teamMembers": {"SS": ["team member 1", "team member 2", "team member 3"]},
    "teamsChannelUrl": {"S": "'"$teamsChannelUrl"'"}
  }'
