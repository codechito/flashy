$('form.set').jsonForm({
  "schema": {
    "name": {
      "type": "string",
      "title": "Campaign Name"
    },
    "msisdn": {
      "type": "string",
      "title": "Mobile Number"
    },
    "messages": {
      "type": "array",
      "maxItems": 20,
      "items": {
        "type": "object",
        "title": "Message Set",
        "properties": {
          "name": {
            "type": "string",
            "title": "Name"
          },
          "question": {
            "type": "string",
            "title": "Question"
          },
          "sequence": {
            "type": "number"
          },
          "suggestions": {
            "type": "array",
            "minItems": 1,
            "maxItems": 10,
            "items": {
              "type": "object",
              "title": "Suggestion",
              "properties": {
                "Type": {
                  "type": "string",
                  "title": "Type",
                  "enum": [
                    "Text",
                    "Action",
                    "Image",
                    "Product",
                    "User"
                  ]
                },
                "Trigger": {
                  "type": "string",
                  "title": "Trigger",
                  "enum": [
                    "End"
                  ]
                },
                "Value": {
                  "type": "string",
                  "title": "Value"
                },
                "Action": {
                  "type": "string",
                  "title": "Action",
                  "enum": [
                    "View Location",
                    "Create Calendar",
                    "Open URL",
                    "Dial Number"
                  ]
                },
                "Phone": {
                  "type": "string",
                  "title": "Phone"
                },
                "Latitude": {
                  "type": "string",
                  "title": "Latitude"
                },
                "Longitude": {
                  "type": "string",
                  "title": "Longitude"
                },
                "Query": {
                  "type": "string",
                  "title": "Query"
                },
                "Start": {
                  "type": "string",
                  "title": "Start Time"
                },
                "End": {
                  "type": "string",
                  "title": "End Time"
                },
                "Description": {
                  "type": "string",
                  "title": "Description"
                },
                "Url": {
                  "type": "string",
                  "title": "URL"
                },
                "Title": {
                  "type": "string",
                  "title": "Title"
                },
                "Price": {
                  "type": "string",
                  "title": "Price"
                },
                "Quantity": {
                  "type": "number",
                  "title": "Quantity"
                },
                "FileUrl": {
                  "type": "string",
                  "title": "File Url"
                },
                "Sequence": {
                  "type": "number",
                },
                "ThumbnailUrl": {
                  "type": "string",
                  "title": "Thumbnail Url"
                },
                "UserInfo": {
                  "type": "string",
                  "title": "User Info",
                  "enum": [
                    "Name",
                    "Address",
                    "Mobile Phone"
                  ]
                }
              }
            }
          }
        }
      }
    }
  },
  "form": [
    "name",
    {
      "type": "tabarray",
      "items": {
        "type": "section",
        "legend": "{{idx}}. {{value}}",
        "items": [
          { 
            "key": "messages[].name",
            "fieldHtmlClass": "setname",
            "valueInLegend": true,
            "onChange": function (evt) {
              $('form.set').find("select.trigger").each(function(){
                  $(this).html("");
              });
              $('form.set').find( "input.setname" ).each(function( index ) {
                var setname = this;
                $('form.set').find("select.trigger").each(function(){
                  let option = new Option($(setname).val(), $(setname).val());
                  $(this).append($(option));
                });
              });
              $('form.set').find("select.trigger").each(function(){
                let option = new Option("End", "End");
                $(this).append($(option));
              });
              
            }
          },
          { 
            "key": "messages[].question",
            "type": "textarea"

          },
          {
            "key" : "messages[].sequence",
            "value": "{{idx}}",
            "type": "hidden"
          },
          {
            "type": "array",
            "items": [
              {
                "type": "selectfieldset",
                "key": "messages[].suggestions[].Type",
                "title": "Type of Suggestion",
                "titleMap": {
                  "Text": "Text Suggestion",
                  "Action": "Action Suggestion",
                  "Image": "Image Suggestion",
                  "Product": "Product Suggestion",
                  "User": "User Profile Suggestion"
                },
                "items": [
                  {
                    "type": "fieldset",
                    "items": [
                      {
                        "key" : "messages[].suggestions[].Trigger",
                        "fieldHtmlClass": "trigger"
                      },
                      "messages[].suggestions[].Value",
                      {
                        "key" : "messages[].suggestions[].Sequence",
                        "value": "{{idx}}",
                        "type": "hidden"
                      }
                    ]
                  },
                  {
                    "type": "fieldset",
                    "items": [
                      {
                        "key" : "messages[].suggestions[].Trigger",
                        "fieldHtmlClass": "trigger"
                      },
                      "messages[].suggestions[].Value",
                      {
                        "type": "selectfieldset",
                        "key": "messages[].suggestions[].Action",
                        "title": "Type of Action",
                        "titleMap": {
                          "View Location": "View Location",
                          "Create Calendar": "Create Calendar",
                          "Open URL": "Open URL",
                          "Dial Number": "Dial Number",
                        },
                        "items": [
                          {
                            "type": "fieldset",
                            "items": [
                              "messages[].suggestions[].Latitude",
                              "messages[].suggestions[].Longitude",
                              "messages[].suggestions[].Query"
                            ]
                          },
                          {
                            "type": "fieldset",
                            "items": [
                              "messages[].suggestions[].Start",
                              "messages[].suggestions[].End",
                              "messages[].suggestions[].Description"
                            ]
                          },
                          "messages[].suggestions[].Url",
                          "messages[].suggestions[].Phone",
                          {
                            "key" : "messages[].suggestions[].Sequence",
                            "value": "{{idx}}",
                            "type": "hidden"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "fieldset",
                    "items": [
                      {
                        "key" : "messages[].suggestions[].Trigger",
                        "fieldHtmlClass": "trigger"
                      },
                      "messages[].suggestions[].Value",
                      "messages[].suggestions[].Description",
                      "messages[].suggestions[].Title",
                      "messages[].suggestions[].FileUrl",
                      "messages[].suggestions[].ThumbnailUrl",
                      {
                        "key" : "messages[].suggestions[].Sequence",
                        "value": "{{idx}}",
                        "type": "hidden"
                      }
                    ]
                  },
                  {
                    "type": "fieldset",
                    "items": [
                      {
                        "key" : "messages[].suggestions[].Trigger",
                        "fieldHtmlClass": "trigger"
                      },
                      "messages[].suggestions[].Quantity",
                      "messages[].suggestions[].Description",
                      "messages[].suggestions[].Price",
                      "messages[].suggestions[].FileUrl",
                      "messages[].suggestions[].ThumbnailUrl",
                      {
                        "key" : "messages[].suggestions[].Sequence",
                        "value": "{{idx}}",
                        "type": "hidden"
                      }
                    ]
                  },
                  {
                    "type": "fieldset",
                    "items": [
                      {
                        "key" : "messages[].suggestions[].Trigger",
                        "fieldHtmlClass": "trigger"
                      },
                      "messages[].suggestions[].Value",
                      "messages[].suggestions[].UserInfo",
                      {
                        "key" : "messages[].suggestions[].Sequence",
                        "value": "{{idx}}",
                        "type": "hidden"
                      },
                    ]
                  }
                ]
              }
            ]
          },
          {
            "type": "actions",
            "items": [
              {
                "type": "button",
                "title": "Send Test Message {{idx}}",
                "onClick": function (evt) {
                  var idx = Number($(evt.target).html().replace("Send Test Message ",""));
                  var values = $('form.set').jsonFormValue();
                  var message = values.messages[idx-1];

                  $.ajax({
                    type: "POST",
                    url: '/campaign/format/rcs',
                    data: {"content":JSON.stringify(message)}
                  }).done(function (result) {
                    var contentMessage = result[0];
                    if(contentMessage.text){
                      var rcsformat = {
                            "contentMessage": contentMessage
                          };

                      var content = {resource : JSON.stringify(rcsformat), msisdn : values.msisdn  };
                      $.ajax({
                          type: "POST",
                          url: '/campaign/rcs/message/send',
                          data: content
                        }).done(function (result) {
                          console.log("result",result);
                          alert(result[0].statusText);
                        }).fail(function (error) {
                          console.log("error",error);
                          alert(error.responseText);
                      });
                    }
                    else{
                      var rcsformat1 = {
                        "contentMessage": {
                          text: message.question
                        }
                      };
                      
                      var content = {resource : JSON.stringify(rcsformat1), msisdn : values.msisdn  };
                      $.ajax({
                          type: "POST",
                          url: '/campaign/rcs/message/send',
                          data: content
                        }).done(function (result) {
                          var rcsformat = {
                            "contentMessage": contentMessage
                          };
                          var content = {resource : JSON.stringify(rcsformat), msisdn : values.msisdn  };
                          $.ajax({
                              type: "POST",
                              url: '/campaign/rcs/message/send',
                              data: content
                            }).done(function (result) {
                              console.log("result",result);
                              alert(result[0].statusText);
                            }).fail(function (error) {
                              console.log("error",error);
                              alert(error.responseText);
                          });
                        }).fail(function (error) {
                          console.log("error",error);
                          alert(error.responseText);
                      });
                    }
                    
                  }).fail(function (error) {
                    console.log("error",error);
                    alert(error.responseText);
                  });
                }
              }
            ]
          }
        ]
      }
    },
    "msisdn",
    {
      "type": "actions",
      "items": [
        {
          "type": "button",
          "title": "Create",
          "onClick": function (evt) {
            
            var values = JSON.stringify($('form.set').jsonFormValue());
            console.log(values);
            
             $.ajax({
               type: "POST",
               url: '/campaign',
               data: {content : values}
             }).done(function (result) {
               console.log("result",result);
               alert(result[0][0]._id);
             }).fail(function (error) {
               console.log("error",error);
               alert(error.responseText);
             });
          }
        }
      ]
    }
  ]
});

    window.setInterval( function() {  
      $('form.set').find("select.nav").each(function(){
                    $(this).change();
      });
    },5);