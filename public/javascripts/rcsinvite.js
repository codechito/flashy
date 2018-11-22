$('form.tester').jsonForm({
  "schema": {
    "msisdn": {
      "type": "string",
      "title": "Mobile Number"
    }
  },
  "form": [
    "msisdn",
    {
      "type": "actions",
      "items": [
        {
          "type": "button",
          "title": "Invite",
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