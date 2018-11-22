  var loadRCSlist = function(optCampaignIds,optCampaigns){
      $('form.start').jsonForm({
        "schema": {
          "campaign": {
            "type": "string",
            "title": "Campaign",
            "enum": optCampaignIds
          }
        },
        "form": [
          {
            "key" : "campaign",
            "titleMap": optCampaigns
          },
          {
            "type": "actions",
            "items": [
              {
                "type": "button",
                "title": "Start",
                "onClick": function (evt) {
                  var values = $('form.start').jsonFormValue();

                  $.ajax({
                    type: "GET",
                    url: '/campaign/start/' + values.campaign
                  }).done(function (result) {
                    console.log("result",result);
                    alert(result[0][0].statusText);
                  }).fail(function (error) {
                    console.log("error",error);
                    alert(error.responseText);
                  });
                }
              },
              {
                "type": "button",
                "title": "Load",
                "onClick": function (evt) {
                  var values = $('form.start').jsonFormValue();
                  window.location.href = '/campaign/rcs/' + values.campaign;
                }
              }
            ]
          }
        ]
      });

};