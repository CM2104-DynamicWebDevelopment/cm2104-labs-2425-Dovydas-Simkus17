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

async function getTracks(searchterm,res){
    spotifyApi.searchTracks(searchterm)
        .then(function(data){
            var tracks = data.body.tracks.items
            //Setting up an empty string to act as the response
            var HTMLResponse = "";
            for(var i=0; i<tracks.length;i++){
                var track = tracks[i];
                //console.log(track.name);
                HTMLResponse = HTMLResponse +
                "<div>" +
                    "<h2>"+track.name+"</h2>"+
                    "<h4>"+track.artists[0].name+"</h4>"+
                    "<button onclick=window.location.href=\'/searchRelatedArtists?searchterm="+String(track.artists[0].id)+"\'>Similar Artists!</button>"+
                    "<button onclick=window.location.href=\'/searchTopTracks?searchterm="+String(track.artists[0].id)+"\'>Top Tracks!</button>"+
                    "<img src='"+track.album.images[0].url+"'>"+
                    "<a href='"+track.external_urls.spotify+"'> Track Details </a>"+
                "</div>";
                //console.log(HTMLResponse);
                
            }
            res.send(HTMLResponse);
        }, function(err){
            console.error(err);
        });
}
async function getTopTrack(artist, res) {
    spotifyApi.getArtistTopTracks(artist, 'GB')
        .then(function(data){
            console.log(data.body);
            var tracks = data.body.tracks
            //Setting up an empty string to act as the response
            var HTMLResponse = "";
            for(var i=0; i<tracks.length;i++){
                var track = tracks[i];
                //console.log(track.name);

                HTMLResponse = HTMLResponse +
                "<div>" +
                    "<h2>"+track.name+"</h2>"+
                    "<h4>"+track.artists[0].name+"</h4>"+
                    "<img src='"+track.album.images[0].url+"'>"+
                    "<a href='"+track.external_urls.spotify+"'> Track Details </a>"+
                "</div>";
                //console.log(HTMLResponse);
                
            }
            res.send(HTMLResponse);
        }, function(err){
            console.log('Something went wrong!',err);
        })
}
async function getRelated(artist, res) {
    spotifyApi.getArtistRelatedArtists(artist)
        .then(function(data){
            console.log(data.body);
            var artists = data.body.artists
            //Setting up an empty string to act as the response
            var HTMLResponse = "";
            for(var i=0; i<tracks.length;i++){
                var artist = artists[i];
                //console.log(track.name);

                HTMLResponse = HTMLResponse +
                "<div>" +
                    "<h2>"+artist.name+"</h2>"+
                    "<h4>"+artist.popularity+"</h4>"+
                    "<img src='"+artist.images[0].url+"'>"+
                    "<a href='"+artist.uri+"'> Artist Details </a>"+
                "</div>";
                //console.log(HTMLResponse);
                
            }
            res.send(HTMLResponse);
        }, function(err){
            console.log('Something went wrong!',err);
        })
}
//Routes
app.get('/searchLove', function(req,res){
    getTracks('love',res);
});
app.get('/search', function(req,res){
    var searchterm = req.query.searchterm;
    getTracks(searchterm,res);
})
app.get('/searchTopTracks', function(req,res){
    var searchterm = req.query.searchterm;
    getTopTrack(searchterm,res);
})
app.get('/searchRelatedArtists', function(req,res){
    var searchterm = req.query.searchterm;
    getRelated(searchterm,res);
})
//TEsting
async function test(searchterm,res){
    spotifyApi.searchTracks(searchterm)
        .then(function(data){
            var tracks = data.body.tracks.items
            //Setting up an empty string to act as the response
            var HTMLResponse = "";
            for(var i=0; i<tracks.length;i++){
                var track = tracks[i];
                console.log(track.name);

                HTMLResponse = HTMLResponse +
                "<div>" +
                    "<button onclick='alert()'>Top Tracks!</button>"+
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

//404 error
app.use(function (req,res,next){
    res.send('This page does not exist!')
})
//active listening
app.listen(8080);