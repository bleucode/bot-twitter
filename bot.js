console.log('The image bot is starting')

var Twit = require('twit');
var fs = require('fs');
var path = require('path');
var config = require(path.join(__dirname, 'config.js'));

var T = new Twit(config);

upload_random_image();
setInterval(function(){
    upload_random_image(images);
  }, 60 * 60 * 1000);
  


function random_from_array(images){
  var images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg',
                '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg',
                 '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg',
                '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg',
                '26.jpg', '27.jpg', '28.jpg', '29.jpg', '30.jpg', '31.jpg', '32.jpg',
                '33.jpg', '34.jpg', '35.jpg', '36.jpg', '37.jpg', '38.jpg',
                '39.jpg', '40.jpg', '41.jpg']
    return images[Math.floor(Math.random() * images.length)];
     
    
  }
function upload_random_image(images){
    console.log('Opening an image...');
    var image_path = path.join(__dirname, '/images/' + random_from_array(images)),
        b64content = fs.readFileSync(image_path, { encoding: 'base64' });
  
    console.log('Uploading an image...');
    
    T.post('media/upload', { media_data: b64content }, function (err, data, response) {
      if (err){
        console.log('ERROR:');
        console.log(err);
      }
      else{
        console.log('Image uploaded!');
        console.log('Now tweeting it...');
  
        T.post('statuses/update', {
            media_ids: new Array(data.media_id_string)
          },
          function(err, data, response) {
            if (err){
              console.log('ERROR:');
              console.log(err);
            }
            else{
              console.log('Posted an image!');
            }
          }
        );
      }
    });
  }
