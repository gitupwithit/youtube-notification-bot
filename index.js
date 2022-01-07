// for each monitored channel:
// fetch current video title
// if title maches stored title, end progrqm
// if title doesn't match stored title (or there is no stores title), send notification
// store title in json file
// to do: make all title storage have no punctuation (like spill)
// make dc channels private!!
// flavour text randomization

const Discord = require("discord.js");
const Jack = new Discord.Client();
Jack.request = new (require("rss-parser"))();
Jack.config = require("./config.js");
const d_channel_1 = process.env['d_channel_1']
const d_channel_2 = process.env['d_channel_2']
const keepAlive = require("./server.js");
const latest_episodes = require("./latest_episodes.json")
const cron = require('node-cron');

const brew_salutations = [
  "No mystery is to great for this guy! ",
  "Mystery time guys! ",
  "He's great! "
]

const spill_salutations = [
  "Drama Alert! Drama Alert! ",
  "It's about to get heated! ",
  "Spill knows all the drams. ",
  "Forget KeemStarr! "
]

const oth_salutations = [
  "Yes! ",
  "Finally one with ME in it! ",
  "I hope they didn't edit me out again. "
]

// Brew

function checkBrew() {
  console.log("brew vids")
  Jack.request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${Jack.config.channel_id}`)
  .then(data => {
    const fs = require('fs')
    fs.readFile('latest_episodes.json', (err, data2) => {
    if (err) throw err
    let episodes = JSON.parse(data2)
    let episode_title = data.items[0].title
    let filtered_episode_title = episode_title.replace(/[\W_]/g, '')
    if(episodes[0]["brew"] != filtered_episode_title) {
      episodes[0]["brew"] = filtered_episode_title
      let data3 = JSON.stringify(episodes, null, 2);
      fs.writeFile('latest_episodes.json', data3, (err) => {
      if (err) throw err;
      console.log(data3)
      console.log('Brew data written to file');

      let auth = data.items[0].author
      let link = data.items[0].link
      let title = data.items[0].title
      if (!d_channel_1 || !d_channel_2) {
        console.log("no channels to send to")
        return;
      }

      let random_number = Math.floor(Math.random() * brew_salutations.length)

      let message = brew_salutations[random_number] + auth + " has just released a new video called, \"" + title + "\" Let's all watch it now! " + link
      Jack.channels.cache.get(d_channel_1).send(message)
      Jack.channels.cache.get(d_channel_2).send(message)
      console.log(message)
      })
    } else {
      console.log("repeat Brew episode")
    }
  })
  });
}

// Spill

function checkSpill() {
  console.log("spill vids")
  Jack.request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${Jack.config.channel_id2}`)
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

      if (!d_channel_1 || !d_channel_1) {
        console.log("no channels to send to")
        return;
      }

      let random_number = Math.floor(Math.random() * spill_salutations.length)

      let message = spill_salutations[random_number] + auth + " has just released a new video called, \"" + title + "\" Let's all watch it now! " + link

      Jack.channels.cache.get(d_channel_1).send(message)
      Jack.channels.cache.get(d_channel_2).send(message)
      console.log(message)
      })
    } else {
      console.log("repeat Spill episode")
    }
  })
  });
}

// On The Hill

function checkOTH() {
  console.log("OTH vids")
  Jack.request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${Jack.config.channel_id3}`)
  .then(data => {
    const fs = require('fs')
  fs.readFile('latest_episodes.json', (err, data2) => {
  if (err) throw err
  let episodes = JSON.parse(data2)
  let episode_title = data.items[0].title
    let filtered_episode_title = episode_title.replace(/[\W_]/g, '')
    if(episodes[0]["oth"] != filtered_episode_title) {
      episodes[0]["oth"] = filtered_episode_title
      let data3 = JSON.stringify(episodes, null, 2);
      fs.writeFile('latest_episodes.json', data3, (err) => {
      if (err) throw err;
      console.log(data3)
      console.log('OTH data written to file');

    let auth = data.items[0].author
    let link = data.items[0].link
    let title = data.items[0].title

    if (!channel || !channel2) {
      console.log("no channels to send to")
      return;
    }

    let random_number = Math.floor(Math.random() * oth_salutations.length)

    let message = oth_salutations[random_number] + auth + " has just released a new video called, \"" + title + "\" Let's all watch it now! " + link

    Jack.channels.cache.get(d_channel_1).send(message)
    Jack.channels.cache.get(d_channel_2).send(message)
    console.log(message)
    })
  } else {
    console.log("repeat OTH episode")
  }
  })
  });
}

Jack.on("ready", () => {
  let random_number = Math.floor(Math.random() * brew_salutations.length)
  console.log("Ready!")
  cron.schedule('16 * * * *', () => {
    checkBrew()
  }
  )
  cron.schedule('17 * * * *', () => {
    checkSpill()
  }
  )
  cron.schedule('18 * * * *', () => {
    checkOTH()
  }
  )
  }
)

Jack.login(Jack.config.token);
keepAlive()