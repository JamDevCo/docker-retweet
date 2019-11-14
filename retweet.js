var Twit = require('twit');
var T = new Twit({
    consumer_key:         process.env.TWITTER_CONSUMER_KEY,
    consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
    access_token:         process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
});
var users = process.env.TWITTER_USERIDs.split(',').filter(function(str) {
    return /\S/.test(str);
});

function sleep(minutes) {
  return new Promise(resolve => setTimeout(resolve, minutes * 6000 ));
}

var minutes;
var stream = T.stream('statuses/filter', {follow: users});
stream.on('tweet', function (tweet) {
    if (users.indexOf(tweet.user.id_str) > -1) {
        console.log(tweet.user.name + ": " + tweet.text);
        minutes = Math.floor(Math.random() * 15) + 5;
        console.log("Sleep for " + minutes + " minutes");
        sleep(minutes).then( () => {
            console.log("Retweeting:");
            T.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
                console.log(data)
                console.log("Retweet was successful");
            });
        });
    }
})