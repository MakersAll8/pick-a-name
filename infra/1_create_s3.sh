#!/bin/bash
aws cloudformation create-stack --stack-name pick-a-name-s3-stack --template-body file://Bucket.yaml
