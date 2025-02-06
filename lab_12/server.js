var express = require('express');
var app = express();
var SpotifyWebApi = require('spotify-web-api-node');

app.use(express.static('public'))
var spotifyApi = new SpotifyWebApi({
    clientId: '938739bda95f4239ae6a7a6622f718e2',
    clientSecret: '706258909c444e2b8f85d6f19c4d1e1d'
})
//Retrive an access token
spotifyApi.clientCredentialsGrant().then(
    function (data){
        console.log('The access token expires in ' + data.body['expires in']);
        console.log('The access token is ' + data.body['access_token']);
        //Save the acces token so that it's used in future calls
        spotifyApi.setAccesToken(data.body['access.token']);
    },
    function(err){
        console.log(
            'Something went wrong when retrieving an access token',
            err.message
        )
    }
)
async function getTracks(searchterm,res){
    spotifyApi.searchTracks(searchterm)
        .then(function(data){
            res.send(JSON.stringify(data.body));
        }, function(err){
            console.error(err);
        });
}
app.get('/searchLove', function(req,res){
    getTracks('love',res);
});
app.listen(8080);