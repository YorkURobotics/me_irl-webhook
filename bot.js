const Discord = require('discord.js');
const request = require('request');
const fs = require('fs');
const config = require('./config.json');
const posts = require('./posts.json');
const client = new Discord.Client();

const webhook = new Discord.WebhookClient(config.webhookid, config.webhooktoken);
client.login(config.bottoken)

const postDict = JSON.parse(fs.readFileSync('./posts.json', 'utf8'));

function postLog(postId, postUrl) {
    postDict[postId] = {
    url: postUrl
  }
  fs.writeFile('./posts.json',JSON.stringify(postDict), (err) => {
    if (err) console.error(err)
  })
}


function fetchRedditPost() {
request(config.url, function(error,response,body) {
      var ok = JSON.parse(body)
      var lol = ok.data.children[0].data
      ok.data.children.forEach(function(ok){
        let NUT = "imgur.com"
        let ext = ".jpg"
        let otherExt = ".gif"
        let dril = ".gifv"
        let r34 = ".png"
        let alb = "/a/"
    if (ok.data.url.includes(NUT) && !ok.data.url.includes(ext || otherExt || dril || r34)) {
       const SHACK = ok.data.url + ext
     if (ok.data.url.includes(alb)) return;
      if (!postDict[ok.data.id]){
        webhook.sendMessage(`${ok.data.title}\n${SHACK}`);
       postLog(ok.data.id, SHACK)
      }
      else {
         return
      }
    }
    else if (ok.data.url.includes("i.reddituploads.com")){
     if (!postDict[ok.data.id]) {
     postLog(ok.data.id,ok.data.preview.images[0].source.url);
     webhook.sendMessage(`${ok.data.title}\n${ok.data.preview.images[0].source.url}`)
     }
     else {
        return;
     }
    }
    else{
      if (!postDict[ok.data.id]){
        postLog(ok.data.id, ok.data.url)
        webhook.sendMessage(`${ok.data.title}\n${ok.data.url}`);
      }
      else{
        return;
      }
      
    };
      })
})
};
function redditInterval() {
 setInterval(() => (fetchRedditPost()), 360000);
}
fetchRedditPost();

client.on('ready', () => {
  console.log('Seizing the means of production in 3, 2, 1...');
});


