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
    suggestions = [];
    if(value.buttons){
      value.buttons.forEach(function(button){
        if(button.type == "Link"){
          suggestions.push({
            action: {
              text: button.label,
              postbackData: button.label,
              openUrlAction: { url: button.url }
            }
          });
        }
        if(button.type == "Call"){
          suggestions.push({
            action: {
              text: button.calllabel,
              postbackData: button.calllabel,
              dialAction: { phoneNumber: button.phone }
            }
          });
        }
        if(button.type == "Invite"){
          suggestions.push({
            action: {
              text: button.calendartitle,
              postbackData: button.calendartitle,
              createCalendarEventAction: { 
                startTime: button.starttime,
                endTime: button.endtime,
                title: button.calendartitle,
                description: button.calendardescription
               }
            }
          });
        }
        if(button.type == "Location"){
          suggestions.push({
            action: {
              text: button.locationlabel,
              postbackData: button.locationlabel,
              viewLocationAction: { 
                latLong: {
                  latitude: button.latitude,
                  longitude: button.longitude
                },
                label: button.locationlabel,
               }
            }
          });
        }
      });
    }
    
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
            suggestions: suggestions,
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

      suggestions = [];
      if(image.buttons){
        image.buttons.forEach(function(button){
          if(button.type == "Link"){
            suggestions.push({
              action: {
                text: button.label,
                postbackData: button.label,
                openUrlAction: { url: button.url }
              }
            });
          }
          if(button.type == "Call"){
            suggestions.push({
              action: {
                text: button.calllabel,
                postbackData: button.calllabel,
                dialAction: { phoneNumber: button.phone }
              }
            });
          }
          if(button.type == "Invite"){
            suggestions.push({
              action: {
                text: button.calendartitle,
                postbackData: button.calendartitle,
                createCalendarEventAction: { 
                  startTime: button.starttime,
                  endTime: button.endtime,
                  title: button.calendartitle,
                  description: button.calendardescription
                }
              }
            });
          }
          if(button.type == "Location"){
            suggestions.push({
              action: {
                text: button.locationlabel,
                postbackData: button.locationlabel,
                viewLocationAction: { 
                  latLong: {
                    latitude: button.latitude,
                    longitude: button.longitude
                  },
                  label: button.locationlabel,
                }
              }
            });
          }
        });
      }

      images.push(
        {
          media: {
            height: value.height,
            contentInfo: {
              fileUrl: image.imageurl,
              forceRefresh: false
            }
          },
          suggestions: suggestions,
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
      console.log("all sent");
    });
  });
  alert ("sent");
  evt.preventDefault();
  return false;
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
            evt.preventDefault();
            return false;
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
  var templates = {"--":"New Template"};
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
              console.log(values);
              if(values.templates == '--'){
                window.location.href = '/campaign/rcs/demo';
              }
              else{
                window.location.href = '/campaign/rcs/demo/' + values.templates;
              }
              evt.preventDefault();
              return false;
            }
          }
        ]
      }
    ],
    value : {templates:template._id}
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

var form = {

  "schema": {
    "_id": {
      "type": "string",
      "title": "Campaign ID"
    },
    "name": {
      "type": "string",
      "title": "Campaign Name",
      "required": true
    },
    "messages": {
      "type": "array",
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
            "title": "Message",
            "required": true
          },
          "imageurl": {
            "type": "string",
            "title": "Image/Video URL",
            "required": true
          },
          "orientation": {
            "type": "string",
            "title": "Card Orientation",
            "enum": ["VERTICAL","HORIZONTAL"]
          },
          "alignment": {
            "type": "string",
            "title": "Thumbnail Alignment ",
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
            "title": "Card Width",
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
                  "title": "Image URL",
                  "required": true
                },
                "title": {
                  "type": "string",
                  "title": "Title Text",
                },
                "description": {
                  "type": "string",
                  "title": "Description Text",
                },
                "label": {
                  "type": "string",
                  "title": "Link Label",
                  "required": true
                },
                "url": {
                  "type": "string",
                  "title": "Link URL",
                  "required": true
                },
                "buttons": {
                  "type": "array",
                  "maxItems": 4,
                  "items": {
                    "type": "object",
                    "title": "Buttons Set",
                    "properties": {
                      "type": {
                        "type": "string",
                        "title": "Type",
                        "enum": ["Link", "Call","Invite", "Location"]
                      },
                      "label": {
                        "type": "string",
                        "title": "Link Label",
                      },
                      "url": {
                        "type": "string",
                        "title": "Link URL",
                      },
                      "calllabel": {
                        "type": "string",
                        "title": "Call Label",
                      },
                      "phone": {
                        "type": "string",
                        "title": "Phone Number",
                      },
                      "starttime": {
                        "type": "string",
                        "title": "Start Time Example: \"2014-10-02T15:01:23.045123456Z\"",
                      },
                      "endtime": {
                        "type": "string",
                        "title": "End Time Example: \"2014-10-02T15:01:23.045123456Z\"",
                      },
                      "calendartitle": {
                        "type": "string",
                        "title": "Calendar Title",
                      },
                      "calendardescription": {
                        "type": "string",
                        "title": "Calendar Description",
                      },
                      "latitude": {
                        "type": "string",
                        "title": "latitude",
                      },
                      "longitude": {
                        "type": "string",
                        "title": "longitude",
                      },
                      "locationlabel": {
                        "type": "string",
                        "title": "Location Label",
                      },
                    }
                  }
                }
              }
            }
          },
          "buttons": {
            "type": "array",
            "maxItems": 4,
            "items": {
              "type": "object",
              "title": "Buttons Set",
              "properties": {
                "type": {
                  "type": "string",
                  "title": "Type",
                  "enum": ["Link", "Call","Invite", "Location"]
                },
                "label": {
                  "type": "string",
                  "title": "Link Label",
                },
                "url": {
                  "type": "string",
                  "title": "Link URL",
                },
                "calllabel": {
                  "type": "string",
                  "title": "Call Label",
                },
                "phone": {
                  "type": "string",
                  "title": "Phone Number",
                },
                "starttime": {
                  "type": "string",
                  "title": "Start Time Example: \"2014-10-02T15:01:23.045123456Z\"",
                },
                "endtime": {
                  "type": "string",
                  "title": "End Time Example: \"2014-10-02T15:01:23.045123456Z\"",
                },
                "calendartitle": {
                  "type": "string",
                  "title": "Calendar Title",
                },
                "calendardescription": {
                  "type": "string",
                  "title": "Calendar Description",
                },
                "latitude": {
                  "type": "string",
                  "title": "latitude",
                },
                "longitude": {
                  "type": "string",
                  "title": "longitude",
                },
                "locationlabel": {
                  "type": "string",
                  "title": "Location Label",
                },
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
                  "fieldHtmlClass":"sequence",
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
                  "fieldHtmlClass":"sequence",
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
                  "fieldHtmlClass":"sequence",
                  "type": "hidden"
                },
                {
                  "key" : "messages[].orientation",
                  "type": "selectfieldset",
                  "titleMap": {
                    "VERTICAL": "VERTICAL",
                    "HORIZONTAL": "HORIZONTAL",
                  },
                  "items": [
                    {
                      "type": "fieldset",
                      "items": [
                        {
                          "key" : "messages[].height",
                        },
                      ]
                    },
                    {
                      "type": "fieldset",
                      "items": [
                        {
                          "key" : "messages[].alignment",
                        },
                        
                      ]
                    },
                    
                  ]
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
                  type: "array",
                  items:[
                    {
                      "type": "selectfieldset",
                      "key": "messages[].buttons[].type",
                      "title": "Button Type",
                      "titleMap": {
                        "Link": "Link",
                        "Call": "Call",
                        "Invite": "Invite",
                        "Location": "Location"
                      },
                      "items": [
                        {
                          "type": "fieldset",
                          "items": [
                            "messages[].buttons[].label",
                            "messages[].buttons[].url"
                          ]
                        },
                        {
                          "type": "fieldset",
                          "items": [
                            "messages[].buttons[].calllabel",
                            "messages[].buttons[].phone"
                          ]
                        },
                        {
                          "type": "fieldset",
                          "items": [
                            "messages[].buttons[].starttime",
                            "messages[].buttons[].endtime",
                            "messages[].buttons[].calendartitle",
                            "messages[].buttons[].calendardescription"
                          ]
                        },
                        {
                          "type": "fieldset",
                          "items": [
                            "messages[].buttons[].latitude",
                            "messages[].buttons[].longitude",
                            "messages[].buttons[].locationlabel"
                          ]
                        },
                      ]
                    }
                  ]
                }

              ]
            },
            {
              "type": "fieldset",
              "items": [
                {
                  "key" : "messages[].sequence",
                  "value": "{{idx}}",
                  "type": "hidden",
                  "fieldHtmlClass":"sequence",
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
                        type: "array",
                        items:[
                          {
                            "type": "selectfieldset",
                            "key": "messages[].images[].buttons[].type",
                            "title": "Button Type",
                            "titleMap": {
                              "Link": "Link",
                              "Call": "Call",
                              "Invite": "Invite",
                              "Location": "Location"
                            },
                            "items": [
                              {
                                "type": "fieldset",
                                "items": [
                                  "messages[].images[].buttons[].label",
                                  "messages[].images[].buttons[].url"
                                ]
                              },
                              {
                                "type": "fieldset",
                                "items": [
                                  "messages[].images[].buttons[].calllabel",
                                  "messages[].images[].buttons[].phone"
                                ]
                              },
                              {
                                "type": "fieldset",
                                "items": [
                                  "messages[].images[].buttons[].starttime",
                                  "messages[].images[].buttons[].endtime",
                                  "messages[].images[].buttons[].calendartitle",
                                  "messages[].images[].buttons[].calendardescription"
                                ]
                              },
                              {
                                "type": "fieldset",
                                "items": [
                                  "messages[].images[].buttons[].latitude",
                                  "messages[].images[].buttons[].longitude",
                                  "messages[].images[].buttons[].locationlabel"
                                ]
                              },
                            ]
                          }
                        ]
                      }
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
            evt.preventDefault();
            var contents = $('form.set').jsonFormValue();

            //validation
            var errors = [];
            if(!contents.name){
              errors.push("Campaign name is required")
            }
            contents.messages.forEach(function(message){
              if(message.type == "Text" && !message.message ){
                errors.push("message is required")
              }
              if(message.type == "Image" && !message.imageurl ){
                errors.push("image url is required")
              }
              if(message.type == "Standalonecard" && (!message.imageurl ) ){
                errors.push("image url is required")
              }
            });

            if(errors && errors.length == 0){
              var i =1;
              contents.messages.forEach(function(message){
                message.sequence = i;
                i++;
              });
              var values = JSON.stringify(contents);
              var method = "POST";
              if(contents._id){
                method = "PUT";    
                values = JSON.stringify([contents]);          
              }
              $.ajax({
                type: method,
                url: '/campaign/template',
                data: {content : values}
              }).done(function (result) {
                console.log("result",result);
                if(method == "POST"){
                  window.location.href = '/campaign/rcs/demo/' + result[0][0]._id;
                }
                else{
                  window.location.href = '/campaign/rcs/demo/' + contents._id;
                }

              }).fail(function (error) {
                console.log("error",error);
                alert(error.responseText);
              });
            }
            else{
              alert(errors.join("\n"));
            }
          }
        }
      ]
    }
  ]
};

if(template){
  if(template.messages && template.messages.length){
    template.messages.sort(function(a, b){
      return a.sequence-b.sequence;
    });
  }
  form.value = template;
}
$('form.set').jsonForm(form);
  
      var changethem =  function() {  
        $('c').find("select.nav").each(function(){
            $(this).change();
        });
      };
      document.addEventListener("drop", function(event) {
        event.preventDefault();
        console.log("chito drop");
        $('form.set').find("select.nav").each(function(){
          $(this).change();
        });
      });

      $('form.set').find('i.glyphicon').on("click", "i.glyphicon", function() {
        $('form.set').find("i.glyphicon").click(changethem)
      });
