// "pk.eyJ1IjoibWFtdGhhc2hhcm1hIiwiYSI6ImNrNHZwbzYyYTI4c20za2xhbWJxeHQ3aXAifQ.-LRitdtsQ-CV5AaUNMYIDQ";
// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
d3.json(queryUrl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
  });
  function createFeatures(earthquakeData) {

    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature, layer) {
      layer.bindPopup("<h4 style='text-align:center;'>" +"<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }
    function markerSize(mag) {
        return mag * 15000;
      }
      
      function markerColor(mag) {
        if (mag <= 1) {
            return "#008000";
        } else if (mag <= 2) {
            return "#9ACD32";
        } else if (mag <= 3) {
            return "#FFFF00";
        } else if (mag <= 4) {
            return "#FFD700";
        } else if (mag <= 5) {
            return "#FF8C00";
        } else {
            return "#FF0000";
        };
      }
      // Create a GeoJSON layer containing the features array on the earthquakeData object
       // Run the onEachFeature function once for each piece of data in the array
   
      let earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function (feature, latlng) {
          return L.circle(latlng, {
            radius: markerSize(feature.properties.mag),
            fillColor: markerColor(feature.properties.mag),
            fillOpacity: 1,
            stroke: false,
          });
        }, onEachFeature: onEachFeature
      });  
    
   
 
  
    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);
  }
  
  function createMap(earthquakes) {
  
    // Define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: "pk.eyJ1IjoibWFtdGhhc2hhcm1hIiwiYSI6ImNrNHZwbzYyYTI4c20za2xhbWJxeHQ3aXAifQ.-LRitdtsQ-CV5AaUNMYIDQ"
    });
  
    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.dark",
      accessToken: "pk.eyJ1IjoibWFtdGhhc2hhcm1hIiwiYSI6ImNrNHZwbzYyYTI4c20za2xhbWJxeHQ3aXAifQ.-LRitdtsQ-CV5AaUNMYIDQ"
    });
  
    // Define a baseMaps object to hold our base layers
    var baseMaps = {
      "Street Map": streetmap,
      "Dark Map": darkmap
    };
  
    // Create overlay object to hold our overlay layer
    var overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [streetmap, earthquakes]
    });
  
    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  }
  let legend = L.control({
    position: 'bottomright'
  });

  function createMap(earthquakes){
    let streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: "pk.eyJ1IjoibWFtdGhhc2hhcm1hIiwiYSI6ImNrNHZwbzYyYTI4c20za2xhbWJxeHQ3aXAifQ.-LRitdtsQ-CV5AaUNMYIDQ"
      });
    
     var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken:"pk.eyJ1IjoibWFtdGhhc2hhcm1hIiwiYSI6ImNrNHZwbzYyYTI4c20za2xhbWJxeHQ3aXAifQ.-LRitdtsQ-CV5AaUNMYIDQ"
     });
      var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.satellite",
        accessToken: "pk.eyJ1IjoibWFtdGhhc2hhcm1hIiwiYSI6ImNrNHZwbzYyYTI4c20za2xhbWJxeHQ3aXAifQ.-LRitdtsQ-CV5AaUNMYIDQ"
      });
    
      // Create a new layer for the fault lines
      let faultLine = new L.LayerGroup();
    
      // Define a baseMaps object to hold our base layers
      let baseMaps = {
        "Street Map": streetmap,
        "Dark Map": darkmap,
        "Satellite Map": satellitemap
      };
    
      // Create overlay object to hold our overlay layer
      let overlayMaps = {
        Earthquakes: earthquakes,
        Faultlines: faultLine
      };
    
      // Create our map, giving it the streetmap and earthquakes layers to display on load
      let myMap = L.map("map", {
        center: [
          37.09, -95.71
        ],
        zoom: 5,
        layers: [darkmap, earthquakes, faultLine]
      });
    
      // Create a layer control for baseMaps and overlayMaps
      L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(myMap);
    
      let faultlinequery = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";
      
      // Create the faultlines and add them to the faultline layer
      d3.json(faultlinequery, function(data) {
        L.geoJSON(data, {
          style: function() {
            return {color: "blue", fillOpacity: 0}
          }
        }).addTo(faultLine)
      })
    
      // Create the colors for the legend
      function magColor(d) {
        return d > 5 ? '#FF0000' :
               d > 4 ? '#FF8C00' :
               d > 3 ? '#FFD700' :
               d > 2 ? '#FFFF00' :
               d > 1 ? '#9ACD32' :
                       '#008000';
      }
    
      // Create the legend
      let legend = L.control({
        position: 'bottomright'
      });
    
      legend.onAdd = function(map) {
        let div = L.DomUtil.create('div', 'info legend'),
              labels = ['<strong><center>Magnitude</center></strong>'],
              magnitude = [0, 1, 2, 3, 4, 5];
    
          for (let i = 0; i < magnitude.length; i++) {
            div.innerHTML +=
            labels.push(
              '<i style="background:' + magColor(magnitude[i] + 1) + '"> </i> ' + 
              magnitude[i] + (magnitude[i + 1] ? ' - ' + magnitude[i + 1] + '<br>' : ' + '));
          }
      
          div.innerHTML = labels.join('');
          return div;
      };
      
      legend.addTo(myMap);
    }