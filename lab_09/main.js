var mymap = L.map('mapid').setView([0,0],1);

var Esri_WorldGrayCanvas = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ', maxZoom: 16 });

Esri_WorldGrayCanvas.addTo(mymap);

//when the button on is clicked
$('#shakey').click(function() {
    console.log("getting quakes");
    $.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson", function(result) {
        console.log(result)
        result.features.forEach(function(quake){
            //for each earthquake
            //get its coordinates
            var lng = quake.geometry.coordinates[0];
            var lat = quake.geometry.coordinates[1];

            var circle = L.circle([lat,lng],1,{
                color: 'red',
                opacity:0,
                fillColor:'red',
                fillOpacity:0.8
            })
            circle.addTo(mymap);
        })
    });
});

//when the button on is clicked
$('#dropey').click(function() {
    console.log("getting drops");
    $.getJSON("https://data.nasa.gov/resource/gh4g-9sfh.json", function(result) {
        console.log(result)
        result.forEach(function(drop){
            console.log(drop)
            if(drop.geolocation == undefined){
                console.log(drop + ": does not have geolocation");
            }else{
                //for each earthquake
                //get its coordinates
                var lng = parseFloat(drop.geolocation.longitude);
                var lat = parseFloat(drop.geolocation.latitude);
                var mass = parseFloat(drop.mass)
                var circle = L.circle([lat,lng],1,{
                    color: 'blue',
                    opacity:0,
                    fillColor:'blue',
                    fillOpacity:0.8,
                    size:mass
                })
                circle.addTo(mymap); 
                circle.addTo(mymap).bindPopup(''+drop.name+'');
            }

        })
    });
});

