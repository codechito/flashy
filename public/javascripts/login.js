var app = new Vue({
    el: '#container',
    data: {
        username: '',
        password: ''
    },
    methods : {
      logon() {
        var vm = this;
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          data: JSON.stringify({username: this.username, password: this.password}),
          url: '/campaign/rcs/login'
        };
        axios(options)
          .then(function(response){
            window.location.href = '/campaign/rcs/message';
          })
          .catch(function (error) {
            alert('Problem welcoming contact, ' + JSON.stringify(error));
          });
      }
    }
  });