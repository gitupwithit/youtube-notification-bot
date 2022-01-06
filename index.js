// for each monitored channel:
// fetch current video title
// if title maches stored title, end progrqm
// if title doesn't match stored title (or there is no stores title), send notification
// store title in json file
// to do: make all title storage have no punctuation (like spill)
// make dc channels private!!
// flavour text randomization

const Discord = require("discord.js");
const client = new Discord.Client();
client.request = new (require("rss-parser"))();
client.config = require("./config.js");
const keepAlive = require("./server.js");
const latest_episodes = require("./latest_episodes.json")

const brew_salutations = [
  " ",
  " "
]

const spill_salutations = [
  " ",
  " "
]

const oth_salutations = [
  " ",
  " "
]

// Brew

function handleUploads() {
  console.log("brew vids")
  //setInterval(() => {
    let channel = client.channels.cache.get(client.config.channel)
    let channel2 = client.channels.cache.get(client.config.channel2)
    client.request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${client.config.channel_id}`)
    .then(data => {
      const fs = require('fs')
      fs.readFile('latest_episodes.json', (err, data2) => {
      if (err) throw err
      let episodes = JSON.parse(data2)
      if(episodes[0]["brew"] != data.items[0].title) {
        episodes[0]["brew"] = data.items[0].title
        let data3 = JSON.stringify(episodes, null, 2);
        fs.writeFile('latest_episodes.json', data3, (err) => {
        if (err) throw err;
        console.log('Brew data written to file');

        let auth = data.items[0].author
        let link = data.items[0].link
        let title = data.items[0].title
        if (!channel || !channel2) {
          console.log("no channels to send to")
          return;
        }

        let message = "Huzzah! " + auth + " has just released a new video called, \"" + title + "\" Let's all watch it now! " + link
        channel.send(message)
        channel2.send(message)
        console.log(message)
        })
      } else {
        console.log("repeat Brew episode")
      }
    })
    });
  //}, client.config.watchInterval);
}

// Spill

function handleUploads2() {
  console.log("spill vids")
  //setInterval(() => {
    let channel = client.channels.cache.get(client.config.channel)
    let channel2 = client.channels.cache.get(client.config.channel2)
    client.request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${client.config.channel_id2}`)
    .then(data => {
      const fs = require('fs')
      fs.readFile('latest_episodes.json', (err, data2) => {
      if (err) throw err
      let episodes = JSON.parse(data2)
      let episode_title = data.items[0].title
      let filtered_episode_title = episode_title.replace(/[\W_]/g, '')
      if(episodes[0]["spill"] != filtered_episode_title) {
        episodes[0]["spill"] = filtered_episode_title
        let data3 = JSON.stringify(episodes, null, 2);
        fs.writeFile('latest_episodes.json', data3, (err) => {
        if (err) throw err;
        console.log(data3)
        console.log('Spill data written to file');

        let auth = data.items[0].author
        let link = data.items[0].link
        let title = data.items[0].title

        if (!channel || !channel2) {
          console.log("no channels to send to")
          return;
        }

        let message = "Huzzah! " + auth + " has just released a new video called, \"" + title + "\" Let's all watch it now! " + link

        channel.send(message)
        channel2.send(message)
        console.log(message)
        })
      } else {
        console.log("repeat Spill episode")
      }
    })
    });
    handleUploads()
  //}, client.config.watchInterval);
}

// On The Hill

function handleUploads3() {
  console.log("OTH vids")
  setInterval(() => {
    let channel = client.channels.cache.get(client.config.channel)
    let channel2 = client.channels.cache.get(client.config.channel2)
    client.request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${client.config.channel_id3}`)
    .then(data => {
      const fs = require('fs')
    fs.readFile('latest_episodes.json', (err, data2) => {
    if (err) throw err
    let episodes = JSON.parse(data2)
    if(episodes[0]["oth"] != data.items[0].title) {
      episodes[0]["oth"] = data.items[0].title
      let data3 = JSON.stringify(episodes, null, 2);
      fs.writeFile('latest_episodes.json', data3, (err) => {
      if (err) throw err;
      console.log('oth data written to file');

      let auth = data.items[0].author
      let link = data.items[0].link
      let title = data.items[0].title

      if (!channel || !channel2) {
        console.log("no channels to send to")
        return;
      }

      let message = "Huzzah! " + auth + " has just released a new video called, \"" + title + "\" Let's all watch it now! " + link

      channel.send(message)
      channel2.send(message)
      console.log(message)
      })
    } else {
      console.log("repeat OTH episode")
    }
    })
    });
    handleUploads2()
  }, client.config.watchInterval);
}

client.on("ready", () => {
    console.log("Ready!")
    handleUploads()
    handleUploads2()
    handleUploads3()
  }
)

client.login(client.config.token);
keepAlive()