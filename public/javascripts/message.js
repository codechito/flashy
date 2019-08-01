Vue.component('element-text', {
  props: ['element'],
  template: `
  <div class="form-group">
    <label >Message</label>
    <textarea class="form-control" placeholder="Type your message here" v-model="element.message"></textarea>
  </div>
  `
});

Vue.component('element-image', {
  props: ['element'],
  template: `
  <div class="form-group">
    <label >Image/Video URL</label>
    <input type="text" class="form-control" v-model="element.imageurl">
  </div>
  `
});

Vue.component('element-carousel', {
  props: ['element'],
  template: `
  <div>
    <div class="form-group">
      <label >Card Width</label>
      <select class="form-control" v-model="element.width">
      <option value="SMALL">SMALL</option>
      <option value="MEDIUM">MEDIUM</option>
      </select>
    </div>
    <div class="form-group">
      <label >Image Height</label>
      <select class="form-control" v-model="element.height">
        <option value="SHORT">SHORT</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="TALL">TALL</option>
      </select>
    </div>
    
    <div>
      <b-card no-body>
        <b-tabs card>
          <b-tab v-for="(image, key) in element.images">
            <template slot="title">Image {{ key + 1}}</template>
            <b-card-text>
              <b-button variant="info" class="float-right icon-button" @click="closeTab(i)"><h3> &times; </h3></b-button>
              <div class="form-group">
                <label >Image/Video URL</label>
                <input type="text" class="form-control" v-model="image.imageurl">
              </div>
              <div class="form-group">
                <label >Title Text</label>
                <input type="text" class="form-control" v-model="image.title">
              </div>
              <div class="form-group">
                <label >Description Text</label>
                <textarea class="form-control" placeholder="Type your message here" v-model="image.description"></textarea>
              </div>
              
            </b-card-text>
          </b-tab>
          <template v-if="element.images.length < 10" slot="tabs-end">
            <b-nav-item @click.prevent="newTab" href="#"><b>+</b></b-nav-item>
          </template>
        </b-tabs>
      </b-card>
    </div>
  </div>
  `
});

Vue.component('element-standalone', {
  props: ['element'],
  template: `
  <div>
    <div class="form-group">
      <label >Card Orientation</label>
      <select class="form-control" v-model="element.orientation">
        <option value="VERTICAL">VERTICAL</option>
        <option value="HORIZONTAL">HORIZONTAL</option>
      </select>
    </div>
    <div class="form-group" v-if="element.orientation == 'HORIZONTAL'">
      <label>Thumbnail Alignment</label>
      <select class="form-control" v-model="element.alignment">
        <option value="LEFT">LEFT</option>
        <option value="RIGHT">RIGHT</option>
      </select>
    </div>
    <div class="form-group" v-if="element.orientation == 'VERTICAL'">
      <label >Image Height</label>
      <select class="form-control" v-model="element.height">
        <option value="SHORT">SHORT</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="TALL">TALL</option>
      </select>
    </div>
    <div class="form-group">
      <label >Image/Video URL</label>
      <input type="text" class="form-control" v-model="element.imageurl">
    </div>
    <div class="form-group">
      <label >Thumbnail URL</label>
      <input type="text" class="form-control" v-model="element.tnurl">
    </div>
    <div class="form-group">
      <label >Title</label>
      <input type="text" class="form-control" v-model="element.title">
    </div>
    <div class="form-group">
      <label >Description</label>
      <textarea class="form-control" placeholder="Type your message here" v-model="element.description"></textarea>
    </div>
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
              message: 'Hello Text 1'
            },
            {
              type: 'Image/Video',
              imageurl: 'http://google.com'
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
              description: "chito description 3"
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
                  description: "chito description 4-1"
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
    idx: 0
  },
  methods: {
    changeMessage(){

    }
  }
})
