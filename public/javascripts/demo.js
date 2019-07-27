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
                thumbnailUrl: value.tnurl,
                forceRefresh: true
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
            height: value.height,
            contentInfo: {
              fileUrl: image.imageurl,
              forceRefresh: false
            }
          },
          suggestions: [{
            action: {
              text: image.label,
              postbackData: image.label,
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
function sendMessage(){
  var values = $('form.set').jsonFormValue();
  var sendvalues = $('form.send').jsonFormValue();
 console.log("sendvalues",sendvalues);
  values.messages.forEach(function(value){
    var template = createTemplate(value);
    var msisdn = sendvalues.msisdn ? sendvalues.msisdn.split(",") : [];
    console.log("msisdn",msisdn);
    console.log("template",template);
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
  });
}

$('form.tester').jsonForm({
  "schema": {
    "msisdn": {
      "type": "string",
    }
  },
  "form": [
    {
      key: "msisdn",
      "htmlClass":"col-lg-8",
      "notitle": true,
      "placeholder": "+61XXXXXX"
    },
    {
      "type": "actions",
      "htmlClass":"col-lg-2",
      "items": [
        {
          "type": "button",
          "title": "INVITE",
          "onClick": function (evt) {
            var values = $('form.tester').jsonFormValue();
            $.ajax({
              type: "POST",
              url: '/campaign/rcs/invite',
              data: values
            }).done(function (result) {
              console.log("result",result);
              alert(result[0].statusText);
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

$.ajax({
  type: "GET",
  url: '/campaign/template',
}).done(function (result) {
  var templates = {"--":"Load saved template"};
  var templateids = ["--"];
  result[0].forEach(function(template){
    templateids.push(template._id);
    templates[template._id] = template.name
  });
  $('form.load').jsonForm({
    "schema": {
      "templates": {
        "type": "string",
        enum: templateids
      }
    },
    "form": [
      {
        key: "templates",
        "htmlClass":"col-lg-8",
        "notitle": true,
        "titleMap": templates
        
      },
      {
        "type": "actions",
        "htmlClass":"col-lg-2",
        "items": [
          {
            "type": "button",
            "title": "LOAD",
            "onClick": function (evt) {
              var values = $('form.load').jsonFormValue();
              window.location.href = '/campaign/rcs/demo/' + values.templates;
            }
          }
        ]
      }
    ]
  });
}).fail(function (error) {
  console.log("error",error);
  alert(error.responseText);
});



$('form.send').jsonForm({
  "schema": {
    "msisdn": {
      "type": "string",
    }
  },
  "form": [
    {
      key: "msisdn",
      "htmlClass":"col-lg-8",
      "notitle": true,
      "placeholder": "+61XXXXXXXX, +61XXXXXXXX, +61XXXXXXXX"
    },
    {
      "type": "actions",
      "htmlClass":"col-lg-2",
      "items": [
        {
          "type": "button",
          "title": "SEND",
          "onClick": sendMessage
        }
      ]
    }
  ]
});

$('form.set').jsonForm({

    "schema": {
      "_id": {
        "type": "string",
        "title": "Campaign ID"
      },
      "name": {
        "type": "string",
        "title": "Campaign Name"
      },
      "messages": {
        "type": "array",
        "maxItems": 20,
        "items": {
          "type": "object",
          "title": "Message Set",
          "properties": {
            "sequence": {
              "type": "string",
              "title": "Sequence"
            },
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
            "tnurl": {
              "type": "string",
              "title": "Thumbnail URL",
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
            "sequence": {
              "type": "number",
              "title": "Sequence"
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
      {
        type: "hidden",
        key: "_id"
      },
      "name",
      {
        type: "array",
        items:[
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
                    "key" : "messages[].sequence",
                    "value": "{{idx}}",
                    "type": "hidden"
                  },
                  {
                    "key" : "messages[].message",
                    "type": "textarea"
                  },
                ]
              },
              {
                "type": "fieldset",
                "items": [
                  {
                    "key" : "messages[].sequence",
                    "value": "{{idx}}",
                    "type": "hidden"
                  },
                  {
                    "key" : "messages[].imageurl",
                    "type": "url"
                  },

                ]
              },
              {
                "type": "fieldset",
                "items": [
                  {
                    "key" : "messages[].sequence",
                    "value": "{{idx}}",
                    "type": "hidden"
                  },
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
                    "key" : "messages[].tnurl",
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

                ]
              },
              {
                "type": "fieldset",
                "items": [
                  {
                    "key" : "messages[].sequence",
                    "value": "{{idx}}",
                    "type": "hidden"
                  },
                  {
                    "key" : "messages[].width",
                  },
                  {
                    "key" : "messages[].height",
                  },
                  {
                    "type": "tabarray",
                    "items": {
                      "type": "section",
                      "legend": "Carousel Image {{idx}}",
                      "items": [
                        
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
                ]
              },
            ]
          }
        ]
      }
      ,
      {
        "type": "actions",
        "items": [
          {
            "type": "button",
            "title": "Save",
            "onClick": function (evt) {
              var values = JSON.stringify($('form.set').jsonFormValue());
              $.ajax({
                type: "POST",
                url: '/campaign/template',
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
    ],
    value: template
  });
  
      window.setInterval( function() {  
        $('form.set').find("select.nav").each(function(){
            $(this).change();
        });
      },5);