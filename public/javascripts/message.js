Vue.component('suggestion', {
  props: ['suggestion','suggestion_type'],
  template: `
  <div class="suggestion">
    <span>{{suggestion.type}}</span>
    <b-button v-b-tooltip.hover title="Remove suggestion" variant="info" class="icon-button float-right" ><h3> &times; </h3></b-button>
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
  props: ['element','suggestion_type','card_width_type','image_height_type'],
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
          <b-tab v-for="(image, key) in element.images">
            <template slot="title">Image {{ key + 1}}</template>
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
              <b-button variant="outline-info" size="sm" href="#">New Card Suggestion</b-button>
              <suggestion v-for="(suggestion, key) in image.card_suggestions" v-bind:key="key" v-bind:suggestion="suggestion" v-bind:suggestion_type="suggestion_type"></suggestion>
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
  props: ['element','suggestion_type','card_orientation_type','thumbnail_alignment_type', 'image_height_type'],
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
    <b-button variant="outline-info" size="sm" href="#">New Card Suggestion</b-button>
    <suggestion v-for="(suggestion, key) in element.card_suggestions" v-bind:key="key" v-bind:suggestion="suggestion" v-bind:suggestion_type="suggestion_type"></suggestion>
  </div>
  `
});

var app = new Vue({
  el: '#app',
  data: {
    contents:{
      agent: 'Sequencer',
      campaign_name: 'Chito Campaign',
      recipients: '+61447738379',
      messages: [
        {
          message_name: 'Chito Message 1',
          elements: [
            {
              type: 'Text',
              message: 'Hello Text 1',
              suggestions:[
                {
                  type: "Link URL",
                  label: "Sample Link",
                  callback: "xxxxxx",
                  url: "https://www.google.com"
                },
                {
                  type: "Dial Number",
                  label: "Sample Call",
                  callback: "xxxxxx",
                  phoneNumber: "+639483184838"
                },
              ]
            },
            {
              type: 'Image/Video',
              imageurl: 'http://google.com',
              suggestions:[
                {
                  type: "Reply",
                  label: "Sample Reply",
                  callback: "xxxxxx"
                },
                {
                  type: "Link URL",
                  label: "Sample Link",
                  callback: "xxxxxx",
                  url: "https://www.google.com"
                },
                {
                  type: "Dial Number",
                  label: "Sample Call",
                  callback: "xxxxxx",
                  phoneNumber: "+639483184838"
                },
              ]
            }
          ]
        },
        {
          message_name: 'Chito Message 2',
          elements: [
            {
              type: 'Text',
              message: 'Hello Text 2'
            },
            {
              type: 'Image/Video',
              imageurl: 'http://yahoo.com'
            }
          ]
        },
        {
          message_name: 'Chito Message 3',
          elements: [
            {
              type: 'Text',
              message: 'Hello Text 3'
            },
            {
              type: 'Standalone',
              orientation: "HORIZONTAL",
              height: "SHORT",
              alignment: "LEFT",
              imageurl: 'http://yahoo.com',
              tnurl: 'http://yahoo.com',
              title: "chito title 3",
              description: "chito description 3",
              suggestions:[
                {
                  type: "Reply",
                  label: "Sample Reply",
                  callback: "xxxxxx"
                },
                {
                  type: "Link URL",
                  label: "Sample Link",
                  callback: "xxxxxx",
                  url: "https://www.google.com"
                },
              ],
              card_suggestions:[
                {
                  type: "Reply",
                  label: "Sample Reply",
                  callback: "xxxxxx"
                },
                {
                  type: "Dial Number",
                  label: "Sample Call",
                  callback: "xxxxxx",
                  phoneNumber: "+639483184838"
                },
                {
                  type: "Calendar Invite",
                  label: "Sample Invite",
                  callback: "xxxxxx",
                  startTime: "2020-06-30T19:00:00Z",
                  endTime: "2020-06-30T20:00:00Z",
                  title: "My Birthday",
                  description: "Join my birthday"
                },
                {
                  type: "View Location",
                  label: "Sample Location",
                  callback: "xxxxxx",
                  latitude: 37.4220188,
                  longitude: -122.0844786
                }
              ]
            },
          ]
        },
        {
          message_name: 'Chito Message 4',
          elements: [
            {
              type: 'Carousel',
              width: "SMALL",
              height: "SHORT",
              images:[
                {
                  imageurl: 'http://burstsms.com.au',
                  title: "chito title 4-1",
                  description: "chito description 4-1",
                  card_suggestions:[
                    {
                      type: "Reply",
                      label: "Sample Reply",
                      callback: "xxxxxx"
                    },
                    {
                      type: "Link URL",
                      label: "Sample Link",
                      callback: "xxxxxx",
                      url: "https://www.google.com"
                    },
                    {
                      type: "Dial Number",
                      label: "Sample Call",
                      callback: "xxxxxx",
                      phoneNumber: "+639483184838"
                    },
                  ]
                },
                {
                  imageurl: 'http://burstsms.com.au',
                  title: "chito title 4-2",
                  description: "chito description 4-2"
                },
                {
                  imageurl: 'http://burstsms.com.au',
                  title: "chito title 4-1",
                  description: "chito description 4-1",
                  card_suggestions:[
                    {
                      type: "Reply",
                      label: "Sample Reply",
                      callback: "xxxxxx"
                    },
                    {
                      type: "Link URL",
                      label: "Sample Link",
                      callback: "xxxxxx",
                      url: "https://www.google.com"
                    },
                    {
                      type: "Dial Number",
                      label: "Sample Call",
                      callback: "xxxxxx",
                      phoneNumber: "+639483184838"
                    },
                  ]
                },
                {
                  imageurl: 'http://burstsms.com.au',
                  title: "chito title 4-2",
                  description: "chito description 4-2"
                },
                {
                  imageurl: 'http://burstsms.com.au',
                  title: "chito title 4-1",
                  description: "chito description 4-1"
                },
              ]
              
            },
          ]
        }
      ]
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
    inviteTester(){
      console.log("chito tester",this.tester);
      var msisdn = this.tester
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({'msisdn':msisdn}),
        url: '/campaign/rcs/invite'
      };
      axios(options)
        .then(function(response){
          console.log(response);
          alert('Invitation Sent');
        })
        .catch(function (error) {
          console.log(error);
          alert('Problem inviting user, please ensure your phone is RCS enabled');
        })

    }
  }
})
