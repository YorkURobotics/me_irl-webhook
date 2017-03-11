const Discord = require('discord.js');
const request = require('request');
const config = require('./config.json');
const client = new Discord.Client();

const webhook = new Discord.WebhookClient(config.webhookid, config.webhooktoken);
client.login(config.bottoken)




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
    if (ok.data.url.includes(NUT) && !ok.data.url.includes(ext) && !ok.data.url.includes(otherExt || dril || r34)) {
       const SHACK = ok.data.url + ext
       webhook.sendMessage(`${ok.data.title}\n${SHACK}`);
    }
    else if (ok.data.url.includes("i.reddituploads.com")){
      webhook.sendMessage(`${ok.data.title}\n${ok.data.preview.images[0].source.url}`)
    }
    else{
      webhook.sendMessage(`${ok.data.title}\n${ok.data.url}`);
    };
      })
})
};
function redditInterval() {
 setInterval(() => (fetchRedditPost()), 360000);
}
redditInterval();




