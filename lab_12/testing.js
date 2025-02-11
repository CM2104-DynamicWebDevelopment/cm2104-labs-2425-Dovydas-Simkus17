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
        spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err){
        console.log(
            'Something went wrong when retrieving an access token',
            err.message
        )
    }
)
async function test(searchterm,res){
    spotifyApi.searchTracks(searchterm)
        .then(function(data){
            var tracks = data.body.tracks.items
            //Setting up an empty string to act as the response
            var HTMLResponse = "";
            var siteName = "primelucas-gateperson-8080.codio.io";
            for(var i=0; i<tracks.length;i++){
                var track = tracks[i];
                console.log(track.name);

                HTMLResponse = HTMLResponse +
                "<div>" +
                    "<button onclick='alert('Asda man')'>Top Tracks!</button>"+
                "</div>";
                console.log(HTMLResponse);
                
            }
            res.send(HTMLResponse);
        }, function(err){
            console.error(err);
        });
}
app.get('/test', function(req,res){
    test('Bills',res);
});