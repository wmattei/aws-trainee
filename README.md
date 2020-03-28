-   Create table

```shell
aws dynamodb create-table --endpoint-url http://localhost:8000 --table-name tasks --attribute-definitions AttributeName=Id,AttributeType=S --key-schema AttributeName=Id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
```

-   Run dynamo locally

```shell
docker run -d -v "$PWD":/dynamodb_local_db -p 8000:8000 --network lambda-local --name dynamodb cnadiminti/dynamodb-local
```

-   Start API localy

```shell
sam local start-api --docker-network lambda-local
```
