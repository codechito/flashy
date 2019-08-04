Vue.component('suggestion', {
  props: [ 'contents','element','suggestion','suggestion_type','idx','sidx', 'csidx','imgidx','simgdx'],
  methods: {
    removeSuggestion(){
      if(this.contents.messages[this.idx].elements[this.sidx].type == 'Standalone'){
        if(this.simgdx >= 0){
          this.contents.messages[this.idx].elements[this.sidx].card_suggestions.splice(this.simgdx, 1);
        }
        else{
          this.contents.messages[this.idx].elements[this.sidx].suggestions.splice(this.csidx, 1);
        }
        
      }
      if(this.contents.messages[this.idx].elements[this.sidx].type == 'Carousel'){
        if(this.imgidx >= 0){
          this.contents.messages[this.idx].elements[this.sidx].images[this.imgidx].card_suggestions.splice(this.csidx, 1); 
        }
        else{
          this.contents.messages[this.idx].elements[this.sidx].suggestions.splice(this.csidx, 1);
        }
        
      }
      if(this.contents.messages[this.idx].elements[this.sidx].type == 'Image/Video'){
        this.contents.messages[this.idx].elements[this.sidx].suggestions.splice(this.csidx, 1);
      }
      if(this.contents.messages[this.idx].elements[this.sidx].type == 'Text'){
        this.contents.messages[this.idx].elements[this.sidx].suggestions.splice(this.csidx, 1);
      }      
     
    }
  },
  template: `
  <div class="suggestion">
    <span>{{suggestion.type}}</span>
    <b-button v-on:click="removeSuggestion()" v-b-tooltip.hover title="Remove suggestion" variant="info" class="icon-button float-right" ><h3> &times; </h3></b-button>
    <hr/><br/>
    <b-form-group description="Suggestion Type" label-size="sm">
      <b-form-select :options="suggestion_type" size="sm" class="form-control" v-model="suggestion.type"></b-form-select>
    </b-form-group>
    <b-form-group description="Label" label-size="sm">
      <b-form-input v-model="suggestion.label" size="sm" class="form-control"></b-form-input>
    </b-form-group>
    <b-form-group description="Callback" label-size="sm">
      <b-form-input v-model="suggestion.callback" size="sm" class="form-control"></b-form-input>
    </b-form-group>
    <b-form-group description="URL" label-size="sm" v-if="suggestion.type == 'Link URL'">
      <b-form-input v-model="suggestion.url" size="sm" class="form-control"></b-form-input>
    </b-form-group>
    <b-form-group description="Phone Number" label-size="sm" v-if="suggestion.type == 'Dial Number'">
      <b-form-input v-model="suggestion.phoneNumber" size="sm" class="form-control"></b-form-input>
    </b-form-group>
    <b-form-group description="Start Time" label-size="sm" v-if="suggestion.type == 'Calendar Invite'">
      <b-form-input v-model="suggestion.startTime" size="sm" class="form-control"></b-form-input>
    </b-form-group>
    <b-form-group description="End Time" label-size="sm" v-if="suggestion.type == 'Calendar Invite'">
      <b-form-input v-model="suggestion.endTime" size="sm" class="form-control"></b-form-input>
    </b-form-group>
    <b-form-group description="Title Text" label-size="sm" v-if="suggestion.type == 'Calendar Invite'">
      <b-form-input v-model="suggestion.title" size="sm" class="form-control"></b-form-input>
    </b-form-group>
    <b-form-group description="Description Text" label-size="sm" v-if="suggestion.type == 'Calendar Invite'">
      <b-form-input v-model="suggestion.description" size="sm" class="form-control"></b-form-input>
    </b-form-group>
    <b-form-group description="Latitude" label-size="sm" v-if="suggestion.type == 'View Location'">
      <b-form-input v-model="suggestion.latitude" size="sm" class="form-control"></b-form-input>
    </b-form-group>
    <b-form-group description="Longitude" label-size="sm" v-if="suggestion.type == 'View Location'">
      <b-form-input v-model="suggestion.longitude" size="sm" class="form-control"></b-form-input>
    </b-form-group>
  </div>
  `
});

Vue.component('element-text', {
  props: ['element'],
  template: `
  <b-form-group label="Message" label-size="sm">
      <b-form-textarea v-model="element.message" size="sm" class="form-control" placeholder="Type your message here"></b-form-textarea>
  </b-form-group>
  `
});

Vue.component('element-image', {
  props: ['element'],
  template: `
  <b-form-group label="Image/Video URL" label-size="sm">
    <b-form-input v-model="element.imageurl" size="sm" class="form-control"></b-form-input>
  </b-form-group>
  `
});

Vue.component('element-carousel', {
  props: ['contents','element','suggestion_type','card_width_type','image_height_type','idx','sidx'],
  methods: {
    addCardSuggestion(imgidx){
      app.contents.messages[this.idx].elements[this.sidx].images[imgidx].card_suggestions.push({
        type: 'Link URL'
      });
      // this.element.images[imgidx].card_suggestions.push({
      //   type: 'Link URL'
      // });
      console.log(this.element);
    }, 
  },
  mouted:function(){
    if(!this.element.images){
      this.element.images = [{
        orientation: "VERTICAL",
        card_suggestions:[{
          type: 'Link URL'
        }]
      }];
    }

  },
  template: `
  <div>
    <b-form-group label="Card Width" label-size="sm">
      <b-form-select v-model="element.width" :options="card_width_type" size="sm" class="form-control"></b-form-select>
    </b-form-group>
    <b-form-group label="Image Height" label-size="sm">
      <b-form-select v-model="element.height" :options="image_height_type" size="sm" class="form-control"></b-form-select>
    </b-form-group>
    <div>
      <b-card no-body>
        <b-tabs card>
          <b-tab v-for="(image, imgkey) in element.images">
            <template slot="title">Image {{ imgkey + 1}}</template>
            <b-card-text>
              <b-button v-b-tooltip.hover title="Remove Image" variant="info" class="float-right icon-button" @click="closeTab(i)"><h3> &times; </h3></b-button>
              <b-form-group label="Image/Video URL" label-size="sm">
                <b-form-input v-model="image.imageurl" size="sm" class="form-control"></b-form-input>
              </b-form-group>
              <b-form-group label="Title" label-size="sm">
                <b-form-input v-model="image.title" size="sm" class="form-control"></b-form-input>
              </b-form-group>
              <b-form-group label="Description" label-size="sm">
                <b-form-textarea v-model="image.description" size="sm" class="form-control"></b-form-textarea>
              </b-form-group>
              <b-button v-on:click="addCardSuggestion(imgkey)" variant="outline-info" size="sm" href="#">New Card Suggestion</b-button>
              <suggestion v-for="(suggestion, ckey) in image.card_suggestions" v-bind:csidx="ckey" v-bind:element="element" v-bind:contents="contents" v-bind:idx="idx" v-bind:sidx="sidx" v-bind:imgidx="imgkey" v-bind:suggestion="suggestion" v-bind:suggestion_type="suggestion_type"></suggestion>
            </b-card-text>
          </b-tab>
          <template v-if="element.images && element.images.length < 10" slot="tabs-end">
            <b-nav-item v-b-tooltip.hover title="Add Image" @click.prevent="newTab" href="#"><b>+</b></b-nav-item>
          </template>
        </b-tabs>
      </b-card>
    </div>
  </div>
  `
});

Vue.component('element-standalone', {
  props: ['contents','element','suggestion_type','card_orientation_type','thumbnail_alignment_type', 'image_height_type','idx','sidx'],
  methods: {
    addCardSuggestion(sidx){
      app.contents.messages[this.idx].elements[sidx].card_suggestions.push({
        type: 'Link URL'
      });
    }, 
  },
  template: `
  <div>
    <b-form-group label="Card Orientation" label-size="sm">
      <b-form-select v-model="element.orientation" :options="card_orientation_type" size="sm" class="form-control"></b-form-select>
    </b-form-group>
    <b-form-group label="Thumbnail Alignment" label-size="sm" v-if="element.orientation == 'HORIZONTAL'">
      <b-form-select v-model="element.alignment" :options="thumbnail_alignment_type" size="sm" class="form-control"></b-form-select>
    </b-form-group>
    <b-form-group label="Image Height" label-size="sm" v-if="element.orientation == 'VERTICAL'">
      <b-form-select v-model="element.height" :options="image_height_type" size="sm" class="form-control"></b-form-select>
    </b-form-group>
    <b-form-group label="Image/Video URL" label-size="sm">
      <b-form-input v-model="element.imageurl" size="sm" class="form-control"></b-form-input>
    </b-form-group>
    <b-form-group label="Thumbnail URL" label-size="sm">
      <b-form-input v-model="element.tnurl" size="sm" class="form-control"></b-form-input>
    </b-form-group>
    <b-form-group label="Title" label-size="sm">
      <b-form-input v-model="element.title" size="sm" class="form-control"></b-form-input>
    </b-form-group>
    <b-form-group label="Description" label-size="sm">
      <b-form-textarea v-model="element.description" size="sm" class="form-control"></b-form-textarea>
    </b-form-group>
    <b-button v-on:click="addCardSuggestion(sidx)" variant="outline-info" size="sm" href="#">New Card Suggestion</b-button>
    <suggestion v-for="(suggestion, ckey) in element.card_suggestions" v-bind:simgdx="ckey" v-bind:element="element" v-bind:contents="contents" v-bind:idx="idx" v-bind:sidx="sidx" v-bind:suggestion="suggestion" v-bind:suggestion_type="suggestion_type"></suggestion>
  </div>
  `
});

const options = {
  method: 'GET',
  url: '/campaign/message'
};

var app = new Vue({
  el: '#app',
  data: {
    cidx: 'new',
    campaigns: [],
    campaign_list: [],
    contents:{
      messages:[{ message_name: 'New Message' ,elements:[{type: 'Text',suggestions:[],card_suggestions:[]}]}]
    }, 
    idx: 0,
    tester: '',
    element_type: [
      { value: 'Text', text: 'Text' },
      { value: 'Image/Video', text: 'Image/Video' },
      { value: 'Standalone', text: 'Standalone' },
      { value: 'Carousel', text: 'Carousel' }
    ],
    suggestion_type: [
      { value: 'Reply', text: 'Reply' },
      { value: 'Link URL', text: 'Link URL' },
      { value: 'Dial Number', text: 'Dial Number' },
      { value: 'Calendar Invite', text: 'Calendar Invite' },
      { value: 'View Location', text: 'View Location' },     
    ],
    card_width_type: [
      { value: 'SMALL', text: 'SMALL' },
      { value: 'MEDIUM', text: 'MEDIUM' },
    ],
    card_orientation_type: [
      { value: 'VERTICAL', text: 'VERTICAL' },
      { value: 'HORIZONTAL', text: 'HORIZONTAL' },
    ],
    thumbnail_alignment_type: [
      { value: 'LEFT', text: 'LEFT' },
      { value: 'RIGHT', text: 'RIGHT' },
    ],
    image_height_type: [
      { value: 'SHORT', text: 'SHORT' },
      { value: 'MEDIUM', text: 'MEDIUM' },
      { value: 'TALL', text: 'TALL' },
    ]
  },
  methods: {
    prepareElement(sidx){
      if(this.contents.messages[this.idx].elements[sidx].type == 'Carousel'){
        if(!this.contents.messages[this.idx].elements[sidx].images){
          this.contents.messages[this.idx].elements[sidx].images = [{
            orientation: "VERTICAL",
            card_suggestions:[{
              type: 'Link URL'
            }]
          }];
        }
        console.log(this.contents.messages[this.idx].elements[sidx]);
      }
      
    },
    addSuggestion(sidx){
      this.contents.messages[this.idx].elements[sidx].suggestions.push({
        type: 'Link URL'
      });
    }, 
    element_change(){
      var newExist = false;
      this.contents.messages.filter(function(elem){
          if(elem.message_name == "New Message") newExist = true;
      });

      if(!newExist){
        this.contents.messages.push({ message_name: 'New Message' ,elements:[{suggestions:[],card_suggestions:[]}]});
      }

    },
    addElement(){
      this.contents.messages[this.idx].elements.push({
        type: 'Text'
      });
    },
    removeElement(){
      this.contents.messages[this.idx].elements.splice(this.idx, 1);
    },
    removeMessage(){
      this.contents.messages.splice(this.idx, 1);
    },
    switchCampaign(){
      this.contents = this.campaigns[this.cidx] || {};
      console.log("this.contents.messages.length",this.contents.messages.length);
      if(this.contents.messages.length > 1 || this.contents.messages.length == 0 ){
        this.contents.messages.push({ message_name: 'New Message' ,elements:[{type: 'Text',suggestions:[],card_suggestions:[]}]});
      }
      
      this.idx = 0;
    },
    getCampaigns(){
      var vm = this;
      const options = {
        method: 'GET',
        url: '/campaign/message'
      };
      axios(options)
        .then(function(response){
          var cmpgns = response.data[0];
          var arrcampaign = [];
          var list = [];
          cmpgns.forEach(function(campaign){
            list.push({
              value: campaign._id,
              text: campaign.campaign_name
            });
            arrcampaign[campaign._id] = campaign;
            
          });
          list.push({
            value: 'new',
            text: 'New Campaign'
          });
          arrcampaign['new'] = {messages:[{ message_name: 'New Message' ,elements:[{type: 'Text', suggestions:[],card_suggestions:[]}]}]};
          var campaign_list = list;
          vm.campaigns = arrcampaign,
          vm.campaign_list = campaign_list,
          vm.contents = vm.campaigns[vm.cidx] || {};

          if(vm.contents.messages.length > 1 || vm.contents.messages.length == 0){
            vm.contents.messages.push({ message_name: 'New Message' ,elements:[{type: 'Text', suggestions:[],card_suggestions:[]}]});
          }
          vm.idx = 0;
          
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    saveCampaign(){
      var content = JSON.parse(JSON.stringify(this.contents));
      
      var method = 'POST';

      content.messages.filter(function(elem,index){
        if(elem.message_name == "New Message") {
          content.messages.splice(index, 1);
        }
      });

      var value = JSON.stringify({ content: JSON.stringify(content) });
      if(content._id){
        method = "PUT";
        value = JSON.stringify({ content: JSON.stringify([content]) });
      }
      const options = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        data: value,
        url: '/campaign/message'
      };
      axios(options)
        .then(function(response){
          console.log(response.data);
          
          if(method == "POST"){
            app.cidx = response.data[0][0]._id;
          }

          app.getCampaigns();
          alert('Campaign Saved');
        })
        .catch(function (error) {
          console.log(error);
          alert('Problem saving campaign');
        });
    },
    inviteTester(){
      var msisdn = this.tester
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({'msisdn':msisdn}),
        url: '/campaign/rcs/invite'
      };
      axios(options)
        .then(function(response){
          console.log(response.data);
          alert('Invitation Sent');
        })
        .catch(function (error) {
          console.log(error);
          alert('Problem inviting user, please ensure your phone is RCS enabled');
        });
    },
    sendMessage(){
      var messages = this.contents.messages;
      var message = messages[this.idx];

      var createSuggestion = function(element){
          var suggestions = [];

          element.forEach(function(suggestion){
            if(suggestion.type == "Reply"){
              suggestions.push({
                reply:{
                  text: suggestion.label,
                  postbackData: suggestion.callback
                }
              });
            }
            if(suggestion.type == "Link URL"){
              suggestions.push({
                action:{
                  text: suggestion.label,
                  postbackData: suggestion.callback,
                  openUrlAction: { url: suggestion.url }
                }
              });
            }
            if(suggestion.type == "Dial Number"){
              suggestions.push({
                action: {
                  text: suggestion.label,
                  postbackData: suggestion.callback,
                  dialAction: { phoneNumber: suggestion.phoneNumber }
                }
              });
            }
            if(suggestion.type == "Calendar Invite"){
              suggestions.push({
                action: {
                  text: suggestion.label,
                  postbackData: suggestion.callback,
                  createCalendarEventAction: { 
                    startTime: suggestion.startTime,
                    endTime: suggestion.endTime,
                    title: suggestion.title,
                    description: suggestion.description
                   }
                }
              });
            }
            if(suggestion.type == "View Location"){
              suggestions.push({
                action: {
                  text: suggestion.label,
                  postbackData: suggestion.callback,
                  viewLocationAction: { 
                    latLong: {
                      latitude: suggestion.latitude,
                      longitude: suggestion.longitude
                    },
                    label: suggestion.label,
                   }
                }
              });
            }
          });

          return suggestions;
      };

      var createTemplate = function(element){
          
          var suggestions = createSuggestion(element.suggestions || []);
          if(element.type == "Text"){
            return {
              contentMessage : {
                text: element.message,
                suggestions: suggestions
              }
            };
          }
          if(element.type == "Image/Video"){
            return {
              contentMessage : {
                contentInfo: {
                  fileUrl : element.imageurl
                },
                suggestions: suggestions
              }
            };
          }
          if(element.type == "Standalone"){
            var card_suggestions = createSuggestion(element.card_suggestions || []);
            return {
              contentMessage : {
                richCard: {
                  standaloneCard: {
                    cardOrientation: element.orientation,
                    thumbnailImageAlignment: element.alignment,
                    cardContent:  {
                      media: {
                        height: element.height,
                        contentInfo: {
                          fileUrl: element.imageurl,
                          thumbnailUrl: element.tnurl,
                          forceRefresh: true
                        }
                      },
                      suggestions: card_suggestions,
                      title: element.title,
                      description: element.description
                    }
                  }
                },
                suggestions: suggestions
              }
            };
          }

          if(element.type == "Carousel"){
            
            var images = [];

            element.images.forEach(function(image){
              var card_suggestions = createSuggestion(image.card_suggestions || []);
              images.push({
                media: {
                  height: element.height,
                  contentInfo: {
                    fileUrl: image.imageurl,
                    forceRefresh: false
                  }
                },
                suggestions: card_suggestions,
                title: image.title,
                description: image.description
              });
            });

            return {
              contentMessage : {
                richCard: {
                  carouselCard: {
                    cardWidth: element.width,
                    cardContents: images
                  }
                },
                suggestions: suggestions
              }
            };
          }
      }

      var recipients = this.contents.recipients.replace(" ","").split(",")
      var total = 0;
      message.elements.forEach(function(element){
        var template = createTemplate(element);
        console.log(template);
        recipients.forEach(function(phone){
          var content = {resource : JSON.stringify(template), msisdn : phone};
          const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(content),
            url: '/campaign/rcs/message/send'
          };
          axios(options)
            .then(function(response){
              total++;
              console.log(response.data);
              if(total >= message.elements.length){
                alert('Message Sent');
              }
              
            })
            .catch(function (error) {
              total++;
              console.log(error);
              if(total >= message.elements.length){
                alert('Problem sending message');
              }
              
            })
        });
      });
    }
  },
  mounted : function () {
    this.getCampaigns();
  }
});


