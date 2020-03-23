sam validate

# ! Change bucket name
sam package --template-file template.yaml --output-template-file deploy.yaml --s3-bucket alpha-bucket-1234 

# ! Change stack name
sam deploy --template-file deploy.yaml --stack-name TodoStack --capabilities CAPABILITY_IAM --region sa-east-1