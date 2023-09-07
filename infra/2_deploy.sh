#!/bin/bash
zip lambda.zip ../index.mjs && \
aws s3 cp lambda.zip s3://pick-a-name-lambda-bucket/ && \
aws cloudformation create-stack --stack-name pick-a-name-stack --template-body file://Stack.yaml --capabilities CAPABILITY_NAMED_IAM
