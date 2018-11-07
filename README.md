# flashy
instant api utility with just a clone and run to a server

## Example Location transaction
Note: this may not accurate for some provider like Globe Telecom

### get current location
GET http://localhost:3000/location

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

## Example RCS transaction

### invite tester's phone
POST http://localhost:3000/campaign/rcs/invite

Request
```
{
  "msisdn":"+61444507129"
}

```

Response
```
[
  {
    status: 200,
    statusText: "OK"
  }
]
```

### send agent event 
POST http://localhost:3000/campaign/rcs/event/send

Request
```
{
  "msisdn":"+61444507129",
  "resource": {"eventType": "IS_TYPING"}
}

```

Response
```
[
  {
    status: 200,
    statusText: "OK"
  }
]
```

### send agent message 
POST http://localhost:3000/campaign/rcs/message/send

Request
```
{
  "msisdn":"+61444507129",
  "resource": {
  	"contentMessage": {
    	"text": "Test message using API"
  	}
  }
}

```

Response
```
[
  {
    status: 200,
    statusText: "OK"
  }
]
```
