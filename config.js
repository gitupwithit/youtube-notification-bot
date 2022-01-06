// channels refer to the discord channel that messages are sent to
// channel_id are the youtube channels

const mySecret = process.env['discord_token']

module.exports = {
    token: mySecret,
    channel: "893873193616539651",
    channel2: "730533183048908912",
    channel_id: "UCVQGtUcRjHTQLTTu-5s9_4Q", // Brew
    channel_id2: "UC_Vl1oLTGjWYJLmbTpaqorQ", // Spill
    channel_id3: "UC5zkKHfavEDoVW703JVs7Yg", // On The Hill
    watchInterval: 300000
}
