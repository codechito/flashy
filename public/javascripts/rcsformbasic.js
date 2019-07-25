$('form.set').jsonForm({

    "schema": {
      "text": {
        "type": "string",
        "title": "Message"
      },
      "fileUrl": {
        "type": "string",
        "title": "File Url"
      },
      "msisdn": {
        "type": "string",
        "title": "Mobile Number"
      },
    },
    "form": [
      "fileUrl",
      "msisdn",
      {
        "key": "text",
        "type": "textarea"
      },
      {
        "type": "actions",
        "items": [
          {
            "type": "button",
            "title": "Create",
            "onClick": function (evt) {
              
              var values = $('form.set').jsonFormValue();
              console.log(values);
              if(values.text ){
              	var rcsformat = {
                	"contentMessage": {
                    		text: values.text 
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
                          var rcsformat = {
                            "contentMessage": {
                                contentInfo: {
                                    fileUrl : values.fileUrl
                                }
                            }
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