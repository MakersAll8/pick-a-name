# Purpose
This repo sends a message to a teams channel to pick a random team member to run stand up. It makes sure that the same team member is only picked once in each new round of drawing.

# How to launch a pick a name stack
- edit teamsChannelUrl and teamMembers in infra/3_create_item.sh
- run
```bash
cd infra
./1_create_s3.sh
# after s3 bucket is set up
./2_deploy.sh
# after stack is launched
./3_create_item.sh
```