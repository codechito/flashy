# flashy
instant api utility with just a clone and run to a server

## Example Profile transaction
Note : For the complete list of field check schema in the code and add as many as you like :)

### Search/Find
GET http://localhost:3000/profile?content={"name":"chito1"}

### Create/Batch Create
POST http://localhost:3000/profile
```
{
  "content": [
    {
      "fname": "chito1",
      "lname": "cascante"
    },
    {
      "fname": "chito2",
      "lname": "cascante"
    }
  ]
}
```

### Update/Batch Update
PUT http://localhost:3000/profile
```
{
  "content": [
    {
      "fname": "chito3",
      "lname": "cascante",
      "_id": "5bdd7518aec02f83ac6f3c60"
    },
    {
      "fname": "chito4",
      "lname": "cascante",
      "_id": "5bdd7518aec02f83ac6f3c61"
    }
  ]
}
```

### Remove/Batch Remove
DELETE http://localhost:3000/profile
```
{
  "content": [
    {
      "_id": "5bdd7518aec02f83ac6f3c60"
    },
    {
      "_id": "5bdd7518aec02f83ac6f3c61"
    }
  ]
}
```

