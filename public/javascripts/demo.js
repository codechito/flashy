function createTemplate(value){
  if(value.type == "Text"){
    return {
      contentMessage : {
        text: value.message
      }
    };
  }
  else if (value.type == "Image"){
    return {
      contentMessage : {
        contentInfo: {
          fileUrl : value.imageurl
        }
      }
    };
  } 
  else if (value.type == "Standalonecard"){
    return {
      contentMessage: {
        richCard: {
        standaloneCard: {
          cardOrientation: value.orientation,
          thumbnailImageAlignment: value.alignment,
          cardContent:  {
            media: {
              height: value.height,
              contentInfo: {
                fileUrl: value.imageurl,
                forceRefresh: false
              }
            },
            suggestions: [{
              action: {
                text: value.label,
                postbackData: value.label,
                openUrlAction: { url: value.url }
              }
            }],
            title: value.title,
            description: value.description
          }
        }
        }
      }
    };
  } 
  else if (value.type == "Carouselcard"){
    var images = [];
    value.images.forEach(function(image){
      images.push(
        {
          media: {
            height: image.height,
            contentInfo: {
              fileUrl: image.imageurl,
              forceRefresh: false
            }
          },
          suggestions: [{
            action: {
              text: image.text,
              postbackData: image.text,
              openUrlAction: { url: image.url }
            }
          }],
          title: image.title,
          description: image.description
        }
      );
    });

    return {
      contentMessage: {
        richCard: {
        carouselCard: {
          cardWidth: value.width,
          cardContents: images
        }
        }
      }
    };
  } 
}
function sendMessage(evt){
  var values = $('form.set').jsonFormValue();
  var idx = Number($(evt.target).html().replace("Test Template ",""));
  if(idx){
    var value = values.messages[idx - 1];
    var template = createTemplate(value);
    var msisdn = values.msisdn ? values.msisdn.split(",") : [];
    console.log(msisdn);
    console.log(template);
    msisdn.forEach(function(phone){
      var content = {resource : JSON.stringify(template), msisdn : phone  };
      $.ajax({
          type: "POST",
          url: '/campaign/rcs/message/send',
          data: content
        }).done(function (result) {
          console.log("result",result);
        }).fail(function (error) {
          alert ("send problem");
          console.log("error",error);
      });
      alert ("sent");
      console.log("all sent");
    });
  }
}

$('form.set').jsonForm({

    "schema": {
      "msisdn": {
        "type": "string",
        "title": "Recipients"
      },
      "messages": {
        "type": "array",
        "maxItems": 20,
        "items": {
          "type": "object",
          "title": "Message Set",
          "properties": {
            "type": {
              "type": "string",
              "title": "Message Types",
              "enum": ["Text", "Image", "Standalonecard", "Carouselcard"]
            },
            "message": {
              "type": "string",
              "title": "Message"
            },
            "imageurl": {
              "type": "string",
              "title": "Image Url"
            },
            "orientation": {
              "type": "string",
              "title": "Card Orientation",
              "enum": ["HORIZONTAL","VERTICAL"]
            },
            "alignment": {
              "type": "string",
              "title": "Thumbnail Alignment",
              "enum": ["LEFT","RIGHT"]
            },
            "height": {
              "type": "string",
              "title": "Image Height",
              "enum": ["SHORT","MEDIUM", "TALL"]
            },
            "width": {
              "type": "string",
              "title": "Image Width",
              "enum": ["SMALL","MEDIUM"]
            },
            "title": {
              "type": "string",
              "title": "Title Text"
            },
            "description": {
              "type": "string",
              "title": "Description Text"
            },
            "label": {
              "type": "string",
              "title": "Link Label"
            },
            "url": {
              "type": "string",
              "title": "Link Url"
            },
            "images": {
              "type": "array",
              "minItems": 2,
              "maxItems": 10,
              "items": {
                "type": "object",
                "title": "Image Set",
                "properties": {
                  "imageurl": {
                    "type": "string",
                    "title": "Image Url"
                  },
                  "height": {
                    "type": "string",
                    "title": "Image Height",
                    "enum": ["SHORT","MEDIUM", "TALL"]
                  },
                  "width": {
                    "type": "string",
                    "title": "Image Width",
                    "enum": ["SMALL","MEDIUM"]
                  },
                  "title": {
                    "type": "string",
                    "title": "Title Text"
                  },
                  "description": {
                    "type": "string",
                    "title": "Description Text"
                  },
                  "label": {
                    "type": "string",
                    "title": "Link Label"
                  },
                  "url": {
                    "type": "string",
                    "title": "Link Url"
                  }
                }
              }
            }
          }
        }
      }
    },
    "form": [
      "msisdn",
      {
        "type": "selectfieldset",
        "key": "messages[].type",
        "title": "Message Type",
        "titleMap": {
          "Text": "Text",
          "Image": "Image",
          "Standalonecard": "Standalone Card",
          "Carouselcard": "Carousel Card"
        },
        "items": [
          {
            "type": "fieldset",
            "items": [
              {
                "key" : "messages[].message",
                "type": "textarea"
              },
              {
                "type": "actions",
                "items": [
                  {
                    "type": "button",
                    "title": "Test Template {{idx}}",
                    "onClick": sendMessage
                  }
                ]
              }
            ]
          },
          {
            "type": "fieldset",
            "items": [
              {
                "key" : "messages[].imageurl",
                "type": "url"
              },
              {
                "type": "actions",
                "items": [
                  {
                    "type": "button",
                    "title": "Test Template {{idx}}",
                    "onClick": sendMessage
                  }
                ]
              }
            ]
          },
          {
            "type": "fieldset",
            "items": [
              {
                "key" : "messages[].orientation",
              },
              {
                "key" : "messages[].alignment",
              },
              {
                "key" : "messages[].height",
              },
              {
                "key" : "messages[].imageurl",
                "type": "url"
              },
              {
                "key" : "messages[].title",
              }
              ,{
                "key" : "messages[].description",
                "type": "textarea"
              },
              {
                "key" : "messages[].label",
              },
              {
                "key" : "messages[].url",
                "type": "url"
              },
              {
                "type": "actions",
                "items": [
                  {
                    "type": "button",
                    "title": "Test Template {{idx}}",
                    "onClick": sendMessage
                  }
                ]
              }
            ]
          },
          {
            "type": "fieldset",
            "items": [
              {
                "key" : "messages[].width",
              },
              {
                "type": "tabarray",
                "items": {
                  "type": "section",
                  "legend": "Carousel Image {{idx}}",
                  "items": [
                    {
                      "key" : "messages[].images[].height",
                    },
                    {
                      "key" : "messages[].images[].imageurl",
                      "type": "url"
                    },
                    {
                      "key" : "messages[].images[].title",
                    }
                    ,{
                      "key" : "messages[].images[].description",
                      "type": "textarea"
                    },
                    {
                      "key" : "messages[].images[].label",
                    },
                    {
                      "key" : "messages[].images[].url",
                      "type": "url"
                    },
                  ]
                }
              },
              
              {
                "type": "actions",
                "items": [
                  {
                    "type": "button",
                    "title": "Test Template {{idx}}",
                    "onClick": sendMessage
                  }
                ]
              }
            ]
          },
        ]
      },
      {
        "type": "actions",
        "items": [
          {
            "type": "button",
            "title": "Save Template",
            "onClick": function (evt) {
              alert ("under construction");
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