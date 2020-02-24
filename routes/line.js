const express = require('express');
const router = express.Router();
const line = require('@line/bot-sdk');
// create LINE SDK config from env variables

const config = {
    channelAccessToken: 'L0a027Z5r0E9eAyTpIfZkv0G73Tq2JchJfNBNNK/CWuYoGm3W1w5COj1oszv1yt3pct2evAxyV8qQATlaHC+VJe7mU6QPZ9E1ITQv1JiO0ODKkaKbfxW0utQ1YrQ69L8miN2maQCzZbwt2HXMjzDVQdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'a8a988af0e487ae5817c6b205efd9a3f',
  };

  const domain = 'https://whatsapp.transmitsms.com';
const client = new line.Client(config);

// callback function to handle a single event
function handleEvent(event) {
    if (event.replyToken && event.replyToken.match(/^(.)\1*$/)) {
      return console.log("Test hook recieved: " + JSON.stringify(event.message));
    }
  
    switch (event.type) {
      case 'message':
        const message = event.message;
        switch (message.type) {
          case 'text':
            console.log("||||||||||||||||",message,"||||||||||||||||",event,"||||||||||||||||||");
            return handleText(message, event.replyToken, event.source);
        //   case 'image':
        //     return handleImage(message, event.replyToken);
        //   case 'video':
        //     return handleVideo(message, event.replyToken);
        //   case 'audio':
        //     return handleAudio(message, event.replyToken);
        //   case 'location':
        //     return handleLocation(message, event.replyToken);
        //   case 'sticker':
        //     return handleSticker(message, event.replyToken);
          default:
            throw new Error(`Unknown message: ${JSON.stringify(message)}`);
        }
  
      case 'follow':
        return replyText(event.replyToken, 'Got followed event');
  
      case 'unfollow':
        return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);
  
      case 'join':
        return replyText(event.replyToken, `Joined ${event.source.type}`);
  
      case 'leave':
        return console.log(`Left: ${JSON.stringify(event)}`);
  
      case 'postback':
        let data = event.postback.data;
        if (data === 'DATE' || data === 'TIME' || data === 'DATETIME') {
          data += `(${JSON.stringify(event.postback.params)})`;
        }

        var record = data.split('|');
        var name = record[0];
        var price = record[1] || 0;
        var total = Number(record[2] || 0) + Number(price);
        switch (name) {
           
            case 'End Order':
                return client.replyMessage(
                    event.replyToken,
                    {
                        type: 'template',
                        altText: 'Buttons alt text',
                        template: {
                        type: 'buttons',
                        thumbnailImageUrl:  domain + '/campaign/images/pizzahut/pizzahutunreal.png',
                        title: 'We got your Order',
                        text: 'We will call you any minute now to confirm',
                        actions: [
                            { label: 'Order again', type: 'postback', data: 'Start Order', text: 'Start Order' },
                        ],
                        },
                    }
                );
            case 'Start Order':
            return client.replyMessage(
                event.replyToken,
                {
                  type: 'template',
                  altText: 'Carousel alt text',
                  template: {
                    type: 'carousel',
                    columns: [
                      {
                        thumbnailImageUrl: domain + '/campaign/images/pizzahut/unreal-hawaiian-lge-pizzas-menu.jpg',
                        title: 'Large Hawaiian Pan',
                        text: 'Unreal Value. Smoky honey ham',
                        actions: [
                          { label: 'Add  $7.00', type: 'postback', data: 'Start Order|7|'+total, text: 'Large Hawaiian Pan' },
                          { label: 'Checkout $' + total + '.00', type: 'postback', data: 'End Order|'+total, text: 'Checkout' },
                        ],
                      },
                      {
                        thumbnailImageUrl: domain + '/campaign/images/pizzahut/unreal-margherita-lge-pizzas-menu.jpg',
                        title: 'Large Margherita Pan',
                        text: 'Unreal Value. Diced tomato ...',
                        actions: [
                            { label: 'Add  $7.00', type: 'postback', data: 'Start Order|7|'+total, text: 'Large Margherita Pan' },
                            { label: 'Checkout $' + total + '.00', type: 'postback', data: 'End Order|'+total, text: 'Checkout' },
                        ],
                      },
                      {
                        thumbnailImageUrl: domain + '/campaign/images/pizzahut/unreal-americano-lge-pizzas-menu.jpg',
                        title: 'Large Americano Pan',
                        text: 'Unreal Value. Pepperoni, mushrooms ...',
                        actions: [
                            { label: 'Add  $7.00', type: 'postback', data: 'Start Order|7|'+total, text: 'Large Americano Pan' },
                            { label: 'Checkout $' + total + '.00', type: 'postback', data: 'End Order|'+total, text: 'Checkout' },
                        ],
                      },
                      {
                        thumbnailImageUrl: domain + '/campaign/images/pizzahut/unreal-hawaiian-lge-pizzas-menu.jpg',
                        title: 'Medium Hawaiian Pan',
                        text: 'Unreal Value. Smoky honey ham',
                        actions: [
                            { label: 'Add  $5.00', type: 'postback', data: 'Start Order|5|'+total, text: 'Medium Hawaiian  Pan' },
                            { label: 'Checkout $' + total + '.00', type: 'postback', data: 'End Order|'+total, text: 'Checkout' },
                        ],
                      },
                      {
                        thumbnailImageUrl: domain + '/campaign/images/pizzahut/unreal-margherita-lge-pizzas-menu.jpg',
                        title: 'Medium Margherita Pan',
                        text: 'Unreal Value. Diced tomato ...',
                        actions: [
                            { label: 'Add  $5.00', type: 'postback', data: 'Start Order|5|'+total, text: 'Medium Margherita  Pan' },
                            { label: 'Checkout $' + total + '.00', type: 'postback', data: 'End Order|'+total, text: 'Checkout' },
                        ],
                      },
                      {
                        thumbnailImageUrl: domain + '/campaign/images/pizzahut/unreal-americano-lge-pizzas-menu.jpg',
                        title: 'Medium Americano Pan',
                        text: 'Unreal Value. Pepperoni, mushrooms ...',
                        actions: [
                            { label: 'Add  $5.00', type: 'postback', data: 'Start Order|5|'+total, text: 'Medium Americano Pan' },
                            { label: 'Checkout $' + total + '.00', type: 'postback', data: 'End Order|'+total, text: 'Checkout' },
                        ],
                      },
                      {
                        thumbnailImageUrl: domain + '/campaign/images/pizzahut/unreal-hawaiian-lge-pizzas-menu.jpg',
                        title: 'Personal Hawaiian Pan',
                        text: 'Unreal Value. Smoky honey ham',
                        actions: [
                            { label: 'Add  $3.00', type: 'postback', data: 'Start Order|3|'+total, text: 'Personal Hawaiian Pan' },
                            { label: 'Checkout $' + total + '.00', type: 'postback', data: 'End Order|'+total, text: 'Checkout' },
                        ],
                      },
                      {
                        thumbnailImageUrl: domain + '/campaign/images/pizzahut/unreal-margherita-lge-pizzas-menu.jpg',
                        title: 'Personal Margherita Pan',
                        text: 'Unreal Value. Diced tomato ...',
                        actions: [
                            { label: 'Add  $3.00', type: 'postback', data: 'Start Order|3|'+total, text: 'Personal Margherita Pan' },
                            { label: 'Checkout $' + total + '.00', type: 'postback', data: 'End Order|'+total, text: 'Checkout' },
                        ],
                      },
                      {
                        thumbnailImageUrl: domain + '/campaign/images/pizzahut/unreal-americano-lge-pizzas-menu.jpg',
                        title: 'Personal Americano Pan',
                        text: 'Unreal Value. Pepperoni, mushrooms ...',
                        actions: [
                            { label: 'Add  $3.00', type: 'postback', data: 'Start Order|3|'+total, text: 'Personal Americano Pan' },
                            { label: 'Checkout $' + total + '.00', type: 'postback', data: 'End Order|'+total, text: 'Checkout' },
                        ],
                      },
  
                    ],
                  },
                }
              );
        };
  
      case 'beacon':
        return replyText(event.replyToken, `Got beacon: ${event.beacon.hwid}`);
  
      default:
        throw new Error(`Unknown event: ${JSON.stringify(event)}`);
    }
  }

  function handleText(message, replyToken, source) {
    const buttonsImageURL = `https://res.cloudinary.com/burst/image/upload/v1576115392/Dominos-241_y415di.jpg`;
  
    switch (message.text.trim().toLowerCase()) {

        case 'pizza hut':
            return client.replyMessage(
                replyToken,
                {
                    type: 'template',
                    altText: 'Buttons alt text',
                    template: {
                    type: 'buttons',
                    thumbnailImageUrl:  domain + '/campaign/images/pizzahut/pizzahutunreal.png',
                    title: 'UNREAL Range',
                    text: 'PERSONAL PAN PIZZA',
                    actions: [
                        { label: 'Start Order', type: 'postback', data: 'Start Order', text: 'Start Order' },
                    ],
                    },
                }
            );

















      case 'pizza': 
        return client.replyMessage(
            replyToken,
            {
                type: 'template',
                altText: 'Buttons alt text',
                template: {
                  type: 'buttons',
                  thumbnailImageUrl: 'https://res.cloudinary.com/burst/image/upload/v1576115392/Dominos-241_y415di.jpg',
                  title: 'ITS TWO FOR TUESDAY',
                  text: 'Buy one get one free!. T&C`s Apply.',
                  actions: [
                    { label: 'Order 2 for 1', type: 'postback', data: 'pizza menu', text: 'Order 2 for 1' },
                    { label: 'Order Something Else', type: 'postback', data: 'other menu', text: 'Order Something Else' },
                  ],
                },
              }
        );
      case 'Order 2 for 1': 
        return client.replyMessage(
            replyToken,
            {
                type: 'template',
                altText: 'Buttons alt text',
                template: {
                  type: 'buttons',
                  thumbnailImageUrl: 'https://res.cloudinary.com/burst/image/upload/v1576115907/RCS%20Testing/pizza-1-menu-dom.jpg',
                  title: 'CHOOSE YOUR 1ST PIZZA',
                  text: ' ',
                  actions: [
                    { label: 'PREMIUM', type: 'postback', data: 'PREMIUM', text: 'PREMIUM' },
                    { label: 'FAVOURITES', type: 'postback', data: 'PREMIUM', text: 'FAVOURITES' },
                    { label: 'Order Something Else', type: 'postback', data: 'Order Something Else', text: 'Order Something Else' },
                  ],
                },
              }
        );
        case 'Order 2 for 2': 
        return client.replyMessage(
            replyToken,
            {
                type: 'template',
                altText: 'Buttons alt text',
                template: {
                  type: 'buttons',
                  thumbnailImageUrl: 'https://res.cloudinary.com/burst/image/upload/v1576115907/RCS%20Testing/pizza-2-menu-dom.jpg',
                  title: 'CHOOSE YOUR 2ND PIZZA',
                  text: ' ',
                  actions: [
                    { label: 'PREMIUM', type: 'postback', data: 'PREMIUM', text: 'PREMIUM2' },
                    { label: 'FAVOURITES', type: 'postback', data: 'PREMIUM', text: 'FAVOURITES' },
                    { label: 'Order Something Else', type: 'postback', data: 'Order Something Else', text: 'Order Something Else' },
                  ],
                },
              }
        );
        case 'Order Something Else': 
        return client.replyMessage(
            replyToken,
            {
                type: 'template',
                altText: 'Buttons alt text',
                template: {
                  type: 'buttons',
                  thumbnailImageUrl: 'https://res.cloudinary.com/burst/image/upload/v1565068492/RCS%20Testing/sides-menu.jpg',
                  title: 'Don`t Feel Like Pizza?',
                  text: 'Try some of our other tasty meals',
                  actions: [
                    { label: 'SIDES', type: 'postback', data: 'SIDES', text: 'SIDES' },
                    { label: 'WINGS', type: 'postback', data: 'WINGS', text: 'WINGS' },
                    { label: 'DEALS', type: 'postback', data: 'DEALS', text: 'DEALS' },
                  ],
                },
              }
        );

        case 'PREMIUM':
            return client.replyMessage(
                replyToken,
                {
                  type: 'template',
                  altText: 'Carousel alt text',
                  template: {
                    type: 'carousel',
                    columns: [
                      {
                        thumbnailImageUrl: 'https://res.cloudinary.com/burst/image/upload/v1565060824/RCS%20Testing/creamy-chicken-bacon-lge-pizzas-menu.jpg',
                        title: 'Creamy Chicken & Bacon',
                        text: 'Tender chicken with onion ...',
                        actions: [
                          { label: 'Add to Order', type: 'postback', data: 'Order 2 for 2', text: 'Order 2 for 2' },
                        ],
                      },
                      {
                          thumbnailImageUrl: 'https://res.cloudinary.com/burst/image/upload/v1565060823/RCS%20Testing/garlic-prawn-lge-pizzas-menu.jpg',
                          title: 'Garlic Prawn',
                          text: 'Succulent prawns, garlic ...',
                          actions: [
                            { label: 'Add to Order', type: 'postback', data: 'Order 2 for 2', text: 'Order 2 for 2' },
                          ],
                        },
                        {
                          thumbnailImageUrl: 'https://res.cloudinary.com/burst/image/upload/v1565060824/RCS%20Testing/creamy-chicken-bacon-lge-pizzas-menu.jpg',
                          title: 'Butcher`s Block',
                          text: 'Steak, streaky bacon ...',
                          actions: [
                            { label: 'Add to Order', type: 'postback', data: 'Order 2 for 2', text: 'Order 2 for 2' },
                          ],
                        },
                        {
                          thumbnailImageUrl: 'https://res.cloudinary.com/burst/image/upload/v1565060823/RCS%20Testing/bbq-chicken-lge-pizzas-menu.jpg',
                          title: 'BBQ Chicken',
                          text: 'Tender chicken, mushrooms ...',
                          actions: [
                            { label: 'Add to Order', type: 'postback', data: 'Order 2 for 2', text: 'Order 2 for 2' },
                          ],
                        },
                        {
                          thumbnailImageUrl: 'https://res.cloudinary.com/burst/image/upload/v1565060823/RCS%20Testing/mega-meatlovers-lge-pizzas-menu.jpg',
                          title: 'Mega Meatlovers',
                          text: 'Steak, streaky bacon ...',
                          actions: [
                            { label: 'Add to Order', type: 'postback', data: 'Order 2 for 2', text: 'Order 2 for 2' },
                          ],
                        },
                        {
                          thumbnailImageUrl: 'https://res.cloudinary.com/burst/image/upload/v1565060823/RCS%20Testing/ultimate-hot-spicy-lge-pizzas-menu.jpg',
                          title: 'Ultimate Hot & Spicy',
                          text: 'Spicy jalapenos ...',
                          actions: [
                            { label: 'Add to Order', type: 'postback', data: 'Order 2 for 2', text: 'Order 2 for 2' },
                          ],
                        },
                    ],
                  },
                }
              );

        case 'PREMIUM2':
        return client.replyMessage(
          replyToken,
          {
            type: 'template',
            altText: 'Carousel alt text',
            template: {
              type: 'carousel',
              columns: [
                {
                  thumbnailImageUrl: 'https://res.cloudinary.com/burst/image/upload/v1565060824/RCS%20Testing/creamy-chicken-bacon-lge-pizzas-menu.jpg',
                  title: 'Creamy Chicken & Bacon',
                  text: 'Tender chicken with onion ...',
                  actions: [
                    { label: 'Add to Order', type: 'postback', data: 'Order 2 for 2', text: 'Add to Order' },
                  ],
                },
                {
                    thumbnailImageUrl: 'https://res.cloudinary.com/burst/image/upload/v1565060823/RCS%20Testing/garlic-prawn-lge-pizzas-menu.jpg',
                    title: 'Garlic Prawn',
                    text: 'Succulent prawns, garlic ...',
                    actions: [
                      { label: 'Add to Order', type: 'postback', data: 'Order 2 for 2', text: 'Add to Order' },
                    ],
                  },
                  {
                    thumbnailImageUrl: 'https://res.cloudinary.com/burst/image/upload/v1565060824/RCS%20Testing/creamy-chicken-bacon-lge-pizzas-menu.jpg',
                    title: 'Butcher`s Block',
                    text: 'Steak, streaky bacon ...',
                    actions: [
                      { label: 'Add to Order', type: 'postback', data: 'Order 2 for 2', text: 'Add to Order' },
                    ],
                  },
                  {
                    thumbnailImageUrl: 'https://res.cloudinary.com/burst/image/upload/v1565060823/RCS%20Testing/bbq-chicken-lge-pizzas-menu.jpg',
                    title: 'BBQ Chicken',
                    text: 'Tender chicken, mushrooms ...',
                    actions: [
                      { label: 'Add to Order', type: 'postback', data: 'Order 2 for 2', text: 'Add to Order' },
                    ],
                  },
                  {
                    thumbnailImageUrl: 'https://res.cloudinary.com/burst/image/upload/v1565060823/RCS%20Testing/mega-meatlovers-lge-pizzas-menu.jpg',
                    title: 'Mega Meatlovers',
                    text: 'Steak, streaky bacon ...',
                    actions: [
                      { label: 'Add to Order', type: 'postback', data: 'Order 2 for 2', text: 'Add to Order' },
                    ],
                  },
                  {
                    thumbnailImageUrl: 'https://res.cloudinary.com/burst/image/upload/v1565060823/RCS%20Testing/ultimate-hot-spicy-lge-pizzas-menu.jpg',
                    title: 'Ultimate Hot & Spicy',
                    text: 'Spicy jalapenos ...',
                    actions: [
                      { label: 'Add to Order', type: 'postback', data: 'Order 2 for 2', text: 'Add to Order' },
                    ],
                  },
              ],
            },
          }
        );

      case 'profile':
        if (source.userId) {
          return client.getProfile(source.userId)
            .then((profile) => replyText(
              replyToken,
              [
                `Display name: ${profile.displayName}`,
                `Status message: ${profile.statusMessage}`,
              ]
            ));
        } else {
          return replyText(replyToken, 'Bot can\'t use profile API without user ID');
        }
      case 'buttons':
        return client.replyMessage(
          replyToken,
          {
            type: 'template',
            altText: 'Buttons alt text',
            template: {
              type: 'buttons',
              thumbnailImageUrl: 'https://res.cloudinary.com/burst/image/upload/v1576115392/Dominos-241_y415di.jpg',
              title: 'My button sample',
              text: 'Hello, my button',
              actions: [
                { label: 'Go to line.me', type: 'uri', uri: 'https://line.me' },
                { label: 'Say hello1', type: 'postback', data: 'hello こんにちは' },
                { label: '言 hello2', type: 'postback', data: 'hello こんにちは', text: 'hello こんにちは' },
                { label: 'Say message', type: 'message', text: 'Rice=米' },
              ],
            },
          }
        );
      case 'confirm':
        return client.replyMessage(
          replyToken,
          {
            type: 'template',
            altText: 'Confirm alt text',
            template: {
              type: 'confirm',
              text: 'Do it?',
              actions: [
                { label: 'Yes', type: 'message', text: 'Yes!' },
                { label: 'No', type: 'message', text: 'No!' },
              ],
            },
          }
        )
      case 'carousel':
        return client.replyMessage(
          replyToken,
          {
            type: 'template',
            altText: 'Carousel alt text',
            template: {
              type: 'carousel',
              columns: [
                {
                  thumbnailImageUrl: buttonsImageURL,
                  title: 'hoge',
                  text: 'fuga',
                  actions: [
                    { label: 'Go to line.me', type: 'uri', uri: 'https://line.me' },
                    { label: 'Say hello1', type: 'postback', data: 'hello こんにちは' },
                  ],
                },
                {
                  thumbnailImageUrl: buttonsImageURL,
                  title: 'hoge',
                  text: 'fuga',
                  actions: [
                    { label: '言 hello2', type: 'postback', data: 'hello こんにちは', text: 'hello こんにちは' },
                    { label: 'Say message', type: 'message', text: 'Rice=米' },
                  ],
                },
              ],
            },
          }
        );
      case 'image carousel':
        return client.replyMessage(
          replyToken,
          {
            type: 'template',
            altText: 'Image carousel alt text',
            template: {
              type: 'image_carousel',
              columns: [
                {
                  imageUrl: buttonsImageURL,
                  action: { label: 'Go to LINE', type: 'uri', uri: 'https://line.me' },
                },
                {
                  imageUrl: buttonsImageURL,
                  action: { label: 'Say hello1', type: 'postback', data: 'hello こんにちは' },
                },
                {
                  imageUrl: buttonsImageURL,
                  action: { label: 'Say message', type: 'message', text: 'Rice=米' },
                },
                {
                  imageUrl: buttonsImageURL,
                  action: {
                    label: 'datetime',
                    type: 'datetimepicker',
                    data: 'DATETIME',
                    mode: 'datetime',
                  },
                },
              ]
            },
          }
        );
      case 'datetime':
        return client.replyMessage(
          replyToken,
          {
            type: 'template',
            altText: 'Datetime pickers alt text',
            template: {
              type: 'buttons',
              text: 'Select date / time !',
              actions: [
                { type: 'datetimepicker', label: 'date', data: 'DATE', mode: 'date' },
                { type: 'datetimepicker', label: 'time', data: 'TIME', mode: 'time' },
                { type: 'datetimepicker', label: 'datetime', data: 'DATETIME', mode: 'datetime' },
              ],
            },
          }
        );
      case 'imagemap':
        return client.replyMessage(
          replyToken,
          {
            type: 'imagemap',
            baseUrl: `${baseURL}/static/rich`,
            altText: 'Imagemap alt text',
            baseSize: { width: 1040, height: 1040 },
            actions: [
              { area: { x: 0, y: 0, width: 520, height: 520 }, type: 'uri', linkUri: 'https://store.line.me/family/manga/en' },
              { area: { x: 520, y: 0, width: 520, height: 520 }, type: 'uri', linkUri: 'https://store.line.me/family/music/en' },
              { area: { x: 0, y: 520, width: 520, height: 520 }, type: 'uri', linkUri: 'https://store.line.me/family/play/en' },
              { area: { x: 520, y: 520, width: 520, height: 520 }, type: 'message', text: 'URANAI!' },
            ],
            video: {
              originalContentUrl: `${baseURL}/static/imagemap/video.mp4`,
              previewImageUrl: `${baseURL}/static/imagemap/preview.jpg`,
              area: {
                x: 280,
                y: 385,
                width: 480,
                height: 270,
              },
              externalLink: {
                linkUri: 'https://line.me',
                label: 'LINE'
              }
            },
          }
        );
      case 'bye':
        switch (source.type) {
          case 'user':
            return replyText(replyToken, 'Bot can\'t leave from 1:1 chat');
          case 'group':
            return replyText(replyToken, 'Leaving group')
              .then(() => client.leaveGroup(source.groupId));
          case 'room':
            return replyText(replyToken, 'Leaving room')
              .then(() => client.leaveRoom(source.roomId));
        }
      default:
        console.log(`Echo message to ${replyToken}: ${message.text}`);
        return true; //replyText(replyToken, message.text);
    }
  }
  // simple reply function
const replyText = (token, texts) => {
    texts = Array.isArray(texts) ? texts : [texts];
    return client.replyMessage(
      token,
      texts.map((text) => ({ type: 'text', text }))
    );
  };




module.exports = function(emitter){

    router.post('/', line.middleware(config), (req, res) => {
        if (req.body.destination) {
          console.log("Destination User ID: " + req.body.destination);
        }
      
        // req.body.events should be an array of events
        if (!Array.isArray(req.body.events)) {
          return res.status(500).end();
        }
      
        // handle events separately
        Promise.all(req.body.events.map(handleEvent))
          .then(() => res.end())
          .catch((err) => {
            console.error(err);
            res.status(500).end();
          });
      });

    return router;
};
