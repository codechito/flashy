# flashy
instant api utility with just a clone and run to a server

## Example Profile transaction
Note : For the complete list of field check schema in the code and add as many as you like :)

### Search/Find
GET http://localhost:3000/profile?content={"name":"chito1"}

Response
```
[  
   [  
      {  
         status:true,
         _id:"5bdd7518aec02f83ac6f3c60",
         fname:"chito1",
         lname:"cascante",
         entry:"2018-11-03T10:16:19.494Z"
      },
      {  
         status:true,
         _id:"5bdd7518aec02f83ac6f3c61",
         fname:"chito2",
         lname:"cascante",
         entry:"2018-11-03T10:16:19.494Z"
      }
   ]
]
```

### Create/Batch Create
POST http://localhost:3000/profile

Request
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
Response
```
[  
   [  
      {  
         status:true,
         _id:"5bdd7518aec02f83ac6f3c60",
         fname:"chito1",
         lname:"cascante",
         entry:"2018-11-03T10:16:19.494Z"
      },
      {  
         status:true,
         _id:"5bdd7518aec02f83ac6f3c61",
         fname:"chito2",
         lname:"cascante",
         entry:"2018-11-03T10:16:19.494Z"
      }
   ]
]
```

### Update/Batch Update
PUT http://localhost:3000/profile

Request
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
Response
```
[  
   {  
      "ok":1,
      "writeErrors":[  

      ],
      "writeConcernErrors":[  

      ],
      "insertedIds":[  

      ],
      "nInserted":0,
      "nUpserted":0,
      "nMatched":2,
      "nModified":2,
      "nRemoved":0,
      "upserted":[  

      ],
      "lastOp":{  
         "ts":"6619801804488048642",
         "t":4
      }
   }
]
```

### Remove/Batch Remove
DELETE http://localhost:3000/profile

Request
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
Response
```
[  
   {  
      "ok":1,
      "writeErrors":[  

      ],
      "writeConcernErrors":[  

      ],
      "insertedIds":[  

      ],
      "nInserted":0,
      "nUpserted":0,
      "nMatched":0,
      "nModified":0,
      "nRemoved":2,
      "upserted":[  

      ],
      "lastOp":{  
         "ts":"6619803823122677762",
         "t":4
      }
   }
]
```

## Example Location transaction

### get current location
GET http://localhost:3000/profile?content={"name":"chito1"}

Response
```
[  
   {  
      formattedAddress:"Elliptical Rd, Quezon City, Philippines",
      latitude:14.6487924,
      longitude:121.0509042,
      country:"Philippines",
      countryCode:"PH",
      state:"National Capital Region",
      county:"Second District NCR",
      city:"Quezon City",
      zipcode:null,
      district:"Pinyahan",
      streetName:"Elliptical Rd",
      streetNumber:null,
      building:null,
      extra:{  
         herePlaceId:"NT_rd8YOfSB29QzNj.KKNqlYA_l_830041223_L",
         confidence:0.99
      },
      administrativeLevels:{  
         level1long:"National Capital Region",
         level2long:"Second District NCR"
      },
      provider:"here"
   }
]
```

