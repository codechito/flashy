$('form.set').jsonForm({

    "schema": {
      "message": {
        "type": "string",
        "title": "Message"
      },

      "text": {
        "type": "string",
        "title": "URL Label"
      },
      "fileUrl": {
        "type": "string",
        "title": "File Url"
      },
      "OpenUrl": {
        "type": "string",
        "title": "Open Url"
      },
      "width": {
        "type": "string",
        "title": "only fro carousel Width e.g. SMALL MEDIUM",
        "enum": ["SMALL","MEDIUM"]

      },
      "height": {
        "type": "string",
        "title": "Height  e.g. SHORT, MEDIUM, TALL",
        "enum": ["SHORT","MEDIUM", "TALL"]

      },
      "orientation": {
        "type": "string",
        "title": "only for standalone Card orientation  e.g. HORIZONTAL, VERTICAL",
        "enum": ["HORIZONTAL","VERTICAL"]
      },
      "alignment": {
        "type": "string",
        "title": "only for standalone thumbnail alignment  e.g. LEFT, RIGHT",
        "enum": ["LEFT","RIGHT"]

      },
      "title": {
        "type": "string",
        "title": "Title"
      },
      "description": {
        "type": "string",
        "title": "Description"
      },
      "cardtype": {
        "type": "string",
        "title": "Card Type 2 images will be sent for carousel, because carousel requires atleast 2",
        "enum": ["carousel","standalone"]
      },
      "msisdn": {
        "type": "string",
        "title": "Mobile Number"
      },
    },
    "form": [
      {
        "key": "message",
        "type": "textarea"
      },
      "cardtype",
      "fileUrl",
      "OpenUrl",
      "text",
      "width",
      "height",
      "alignment",
      "orientation",
      "title",
      {
        "key": "description",
        "type": "textarea"
      },
      "msisdn",
      {
        "type": "actions",
        "items": [
          {
            "type": "button",
            "title": "Create",
            "onClick": function (evt) {
              
              var values = $('form.set').jsonFormValue();
              console.log(values);

         if(values.message ){
              	var rcsformat = {
                	"contentMessage": {
                    		text: values.message 
               		 }
             	 };
              	var content = {resource : JSON.stringify(rcsformat), msisdn : values.msisdn  };
                      $.ajax({
                          type: "POST",
                          url: '/campaign/rcs/message/send',
                          data: content
                        }).done(function (result) {
 
                        }).fail(function (error) {
                          console.log("error",error);
                          alert(error.responseText);
                      });
		
}
                        if(values.fileUrl){ 
                          var rcsformatcarousel = {
				"contentMessage": {
					"suggestions": [],
					"richCard": {
					"carouselCard": {
						"cardWidth": values.width,
						"cardContents": [ {
							"media": {
								"height": values.height,
								"contentInfo": {
									"fileUrl": values.fileUrl,
									"forceRefresh": false
								}
							},
							"suggestions": [{
								"action": {
									"text": values.text,
									"postbackData": "End|45be7e60-7aed-4b4f-a115-c8100256220c|b9cf38e7-ee1f-45c1-89ea-2d632767748d",
                            						"openUrlAction": { "url": values.OpenUrl }
								}
							}],
							"title": values.title,
							"description": values.description
						},{
							"media": {
								"height": values.height,
								"contentInfo": {
									"fileUrl": values.fileUrl,
									"forceRefresh": false
								}
							},
							"suggestions": [{
								"action": {
									"text": values.text,
									"postbackData": "End|45be7e60-7aed-4b4f-a115-c8100256220c|b9cf38e7-ee1f-45c1-89ea-2d632767748d",
                            						"openUrlAction": { "url": values.OpenUrl }
								}
							}],
							"title": values.title,
							"description": values.description
						}]
					}
					}
				}
			  };                          
                          var rcsformatstandalone = {
				"contentMessage": {
					"suggestions": [],
					"richCard": {
					"standaloneCard": {
						"cardOrientation": values.orientation,
                                                "thumbnailImageAlignment": values.alignment,
						"cardContent":  {
							"media": {
								"height": values.height,
								"contentInfo": {
									"fileUrl": values.fileUrl,
									"forceRefresh": false
								}
							},
							"suggestions": [{
								"action": {
									"text": values.text,
									"postbackData": "End|45be7e60-7aed-4b4f-a115-c8100256220c|b9cf38e7-ee1f-45c1-89ea-2d632767748d",
                            						"openUrlAction": { "url": values.OpenUrl }
								}
							}],
							"title": values.title,
							"description": values.description
						}
					}
					}
				}
			  };
                       if(values.cardtype == "carousel"){
                           var rcsformat = rcsformatcarousel ;
                       }
                       else{
                           var rcsformat = rcsformatstandalone ;
                       }
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