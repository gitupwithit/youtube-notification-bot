// for each monitored channel:
// fetch current video title
// if title maches stored title, end progrqm
// if title doesn't match stored title (or there is no stores title), send notification
// store title in json file

const Discord = require("discord.js");
const client = new Discord.Client();
client.db = require("quick.db");
client.request = new (require("rss-parser"))();
client.config = require("./config.js");
const keepAlive = require("./server.js");
const latest_episodes = require("./latest_episodes.json")
const channel = client.channels.cache.get(client.config.channel)
const channel2 = client.channels.cache.get(client.config.channel2)

// Brew

function handleUploads() {
  console.log("brew vids")
  //if (client.db.fetch(`postedVideos`) === null) client.db.set(`postedVideos`, []);
  setInterval(() => {
      client.request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${client.config.channel_id}`)
      .then(data => {
        
          // if (client.db.fetch(`postedVideos`).includes(data.items[0].link)) return;
          // else {
            
              client.db.set(`videoData`, data.items[0]);
              //client.db.push("postedVideos", data.items[0].link);
              let parsed = client.db.fetch(`videoData`);
              let channel = client.channels.cache.get(client.config.channel);
              let channel2 = client.channels.cache.get(client.config.channel2);

              if (!channel || !channel2) return;
              let message = client.config.messageTemplate
                  .replace(/{author}/g, parsed.author)
                  .replace(/{title}/g, Discord.Util.escapeMarkdown(parsed.title))
                  .replace(/{url}/g, parsed.link);


              const fs = require('fs')
              fs.readFile('latest_episodes.json', (err, data2) => {
              if (err) throw err
              let episodes = JSON.parse(data2)
              console.log(episodes[0]["brew"])
              if(episodes[0]["brew"] != data.items[0].title) {
                episodes[0]["brew"] = data.items[0].title
                let data3 = JSON.stringify(episodes, null, 2);
                fs.writeFile('latest_episodes.json', data3, (err) => {
                if (err) throw err;
                console.log('Data written to file');
                })
                } else {
                  console.log("same episode")
                }
            })
      });
  }, client.config.watchInterval);
}

// Spill

function handleUploads2() {
  console.log("spill vids")
  if (client.db.fetch(`postedVideos`) === null) client.db.set(`postedVideos`, []);
  setInterval(() => {
      client.request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${client.config.channel_id2}`)
      .then(data => {
          if (client.db.fetch(`postedVideos`).includes(data.items[0].link)) return;
          else {
              client.db.set(`videoData`, data.items[0]);
              client.db.push("postedVideos", data.items[0].link);
              let parsed = client.db.fetch(`videoData`);
              let channel = client.channels.cache.get(client.config.channel);
              let channel2 = client.channels.cache.get(client.config.channel2);
              if (!channel || !channel2) return;
              let message = client.config.messageTemplate
                  .replace(/{author}/g, parsed.author)
                  .replace(/{title}/g, Discord.Util.escapeMarkdown(parsed.title))
                  .replace(/{url}/g, parsed.link);
              channel.send(message);
              channel2.send(message);
          }
      });
  }, client.config.watchInterval);
}

// On The Hill

function handleUploads3() {
  console.log("OTH vids")
  if (client.db.fetch(`postedVideos`) === null) client.db.set(`postedVideos`, []);
  setInterval(() => {
      client.request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${client.config.channel_id3}`)
      .then(data => {
          if (client.db.fetch(`postedVideos`).includes(data.items[0].link)) return;
          else {
              client.db.set(`videoData`, data.items[0]);
              client.db.push("postedVideos", data.items[0].link);
              let parsed = client.db.fetch(`videoData`);
              let channel = client.channels.cache.get(client.config.channel);
              let channel2 = client.channels.cache.get(client.config.channel2);
              if (!channel || !channel2) return;
              let message = client.config.messageTemplate
                  .replace(/{author}/g, parsed.author)
                  .replace(/{title}/g, Discord.Util.escapeMarkdown(parsed.title))
                  .replace(/{url}/g, parsed.link);
              channel.send(message);
              channel2.send(message);
          }
      });
  }, client.config.watchInterval);
}

client.on("ready", () => {
    let c = client.channels.cache.get(client.config.channel).id
    let c2 = client.channels.cache.get(client.config.channel2).id
    console.log("Ready!")
    handleUploads()
    //handleUploads2()
    //handleUploads3()
    //client.channels.cache.get(c).send("ready");
    //client.channels.cache.get(c2).send("ready");
  }
)

client.login(client.config.token);
keepAlive()