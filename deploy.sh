#!/bin/bash
zip lambda.zip ../index.js && \
aws cloudformation create-stack --stack-name pick-a-name-s3-stack --template-body file://Bucket.yaml && \
aws s3 cp lambda.zip s3://pick-a-name-lambda-bucket/ && \
aws cloudformation create-stack --stack-name pick-a-name-stack --template-body file://Stack.yaml