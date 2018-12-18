<template>
  <section class="container">
    <div id="viewDiv"/>
    <div
      id="controls"
      class="controls">
      <b-button
        id="vandalism"
        size="sm"
        class="control_buttons_vandalism"
        style="background-color: rgba(0, 231, 255, 0.15); border-radius: 0 0 0 0; border-color: rgba(0, 231, 255, 0); margin-right: -5px; width: 100px;"
      >Vandalism</b-button>
      <b-button
        id="gta"
        size="sm"
        class="control_buttons_gta"
        style="background-color: rgba(255, 255, 255, 0.15); border-radius: 0 0 0 0; border-color: rgba(0, 231, 255, 0); margin-right: -5px; width: 100px;"
      >Auto Theft</b-button>
      <b-button
        id="robbery"
        size="sm"
        class="control_buttons_robbery"
        style="background-color: rgba(255, 153, 255, 0.15); border-radius: 0 0 0 0; border-color: rgba(0, 231, 255, 0); margin-right: -6px; width: 100px;"
      >Robbery</b-button>
      <b-button
        id="drugs"
        size="sm"
        class="control_buttons_drugs"
        style="background-color: rgba(244, 131, 66, 0.30); border-radius: 0 0 0 0; border-color: rgba(0, 231, 255, 0); margin-right: -5px; width: 100px;"
      >Drug Charges</b-button>
      <b-button
        id="assault"
        size="sm"
        class="control_buttons_assault"
        style="background-color: rgba(26, 224, 49, 0.15); border-radius: 0 0 0 0; border-color: rgba(0, 231, 255, 0); margin-right: -6px; width: 100px;"
      >Assault</b-button>
      <b-button
        id="clear"
        size="sm"
        class="control_buttons_clear"
        style="background-color: rgba(255, 0.5, 0, 0.15); border-radius: 0 0 0 0; border-color: rgba(0, 231, 255, 0); width: 100px;"
      >Clear Map</b-button>
      <p
        v-if="formError"
        class="error">{{ formError }}</p>
    </div>
  </section>
</template>
 <script>
   import { loadModules } from 'esri-loader';
  export default {
    data () {
      return {
        token: this.$store.state.authUser.data.token,
        formError: null,
      }
    },
    middleware : 'auth',
      mounted() {
      console.log('map: mounted')
      loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/Graphic",
      "esri/geometry/Point",
      "esri/symbols/SimpleMarkerSymbol",
      "esri/geometry/Polyline",
      "esri/symbols/SimpleLineSymbol",
      "esri/geometry/Polygon",
      "esri/symbols/SimpleFillSymbol",
      "dojo/domReady!",
      "esri/widgets/Legend",
      "esri/widgets/Expand",
      "esri/widgets/LayerList",
      "esri/WebMap"
        ], {
        }).then(([Map, MapView,
          Graphic, Point, SimpleMarkerSymbol,LayerList,
          Polyline, SimpleLineSymbol,Expand,WebMap,
          Polygon, SimpleFillSymbol,Legend]) => {
            var map = new Map({
          basemap: "dark-gray"
        });
         var view = new MapView({
          container: "viewDiv",
           map: map,
          center: ['-71.05','42.36'],
          zoom: 14
        });
         // Create a point
        var point = new Point({
          longitude: '-71.04352956',
          latitude: '42.12950634'
        });
         // Create a symbol for drawing the point
        var markerSymbol = new SimpleMarkerSymbol({
          color: [212, 119, 40,0],
          outline: {
            color: [255, 255, 255,0],
            width: 1
          }
        });
         // Create a graphic and add the geometry and symbol to it
        var pointGraphic = new Graphic({
          geometry: point,
          symbol: markerSymbol
        });
         view.graphics.add(pointGraphic);
         var newItem = {
            'token': this.token
        };
        localStorage.setItem('itemsArray', JSON.stringify(newItem));
         document.getElementById("controls").addEventListener("click", function(event) {
            var local = event.view.localStorage.itemsArray
            var datai = JSON.parse(local);
            const token = datai.token

             if (event.target.id === "vandalism") {
               (async () => {
                   const data = await fetch('/geoloc/VANDALISM', {
                   method: 'GET',
                   headers: {
                     'Authorization': token
                   }
                  }).then((response) => {
                   return response.json();
                 }).then(data => {
                   // view.graphics.removeAll()
                   console.log(data)
                   data.data.forEach(function(element) {
                     const mydata = JSON.stringify(element)
                     const mlydata = mydata.substr(0, mydata.indexOf('}'))
                     const myresult = mlydata.substring(13)
                     const lat = myresult.substr(1,myresult.indexOf(','))
                     const titilat = (lat.length-1)
                     const lng = myresult.split(",")[1]
                     const longi = lng.replace(')','')
                     var point = new Point({
                       longitude: longi,
                       latitude: lat
                     });
                     var markerSymbol = new SimpleMarkerSymbol({
                       color: [0, 231, 255, 0.45],
                       outline: {
                         color: [0, 231, 255, 0],
                         width: 1
                       }
                     });
                      // Create a graphic and add the geometry and symbol to it
                     pointGraphic = new Graphic({
                       geometry: point,
                       symbol: markerSymbol
                     });
                     view.graphics.add(pointGraphic);
                   });
                 })
                 .catch(function (error) {
                     console.log(error.response);
                 });
               })();
             } else if (event.target.id === "robbery") {

              (async () => {
                  const data = await fetch('/geoloc/ROBBERY', {
                  method: 'GET',
                  headers: {
                    'Authorization': token
                  }
                 }).then((response) => {
                  return response.json();
                }).then(data => {
                  console.log(data)
                  // view.graphics.removeAll()
                  data.data.forEach(function(element) {
                    const mydata = JSON.stringify(element)
                    const mlydata = mydata.substr(0, mydata.indexOf('}'))
                    const myresult = mlydata.substring(13)
                    const lat = myresult.substr(1,myresult.indexOf(','))
                    const titilat = (lat.length-1)
                    const lng = myresult.split(",")[1]
                    const longi = lng.replace(')','')
                    var point = new Point({
                      longitude: longi,
                      latitude: lat
                    });
                    var markerSymbol = new SimpleMarkerSymbol({
                      color: [255, 153, 255, 0.35],
                      outline: {
                        color: [255, 153, 255, 0],
                        width: 1
                      }
                    });
                    pointGraphic = new Graphic({
                      geometry: point,
                      symbol: markerSymbol
                    });
                    view.graphics.add(pointGraphic);
                  });
                })
                .catch(function (error) {
                    console.log(error.response);
                });
              })();
            } else if (event.target.id === "gta") {
              //console.log('robbery')


             (async () => {
                 const data = await fetch('/geoloc/AUTO THEFT', {
                 method: 'GET',
                 headers: {
                   'Authorization': token
                 }
                }).then((response) => {
                 return response.json();
               }).then(data => {
                 // view.graphics.removeAll()
                 console.log(data)
                 data.data.forEach(function(element) {
                   const mydata = JSON.stringify(element)
                   const mlydata = mydata.substr(0, mydata.indexOf('}'))
                   const myresult = mlydata.substring(13)
                   const lat = myresult.substr(1,myresult.indexOf(','))
                   const titilat = (lat.length-1)
                   const lng = myresult.split(",")[1]
                   const longi = lng.replace(')','')
                   var point = new Point({
                     longitude: longi,
                     latitude: lat
                   });
                   var markerSymbol = new SimpleMarkerSymbol({
                     color: [255, 255, 255, 0.45],
                     outline: {
                       color: [255, 255, 255, 0.45],
                       width: 1
                     }
                   });
                   pointGraphic = new Graphic({
                     geometry: point,
                     symbol: markerSymbol
                   });
                   view.graphics.add(pointGraphic);
                 });
               })
               .catch(function (error) {
                   console.log(error.response);
               });
             })();
           } else if (event.target.id === "drugs") {
             //console.log('robbery')


            (async () => {
                const data = await fetch('/geoloc/DRUG CHARGES', {
                method: 'GET',
                headers: {
                  'Authorization': token
                }
               }).then((response) => {
                return response.json();
              }).then(data => {
                // view.graphics.removeAll()
                console.log(data)
                data.data.forEach(function(element) {
                  const mydata = JSON.stringify(element)
                  const mlydata = mydata.substr(0, mydata.indexOf('}'))
                  const myresult = mlydata.substring(13)
                  const lat = myresult.substr(1,myresult.indexOf(','))
                  const titilat = (lat.length-1)
                  const lng = myresult.split(",")[1]
                  const longi = lng.replace(')','')
                  var point = new Point({
                    longitude: longi,
                    latitude: lat
                  });
                  var markerSymbol = new SimpleMarkerSymbol({
                    color: [244, 131, 66, 0.45],
                    outline: {
                      color: [244, 131, 66, 0.45],
                      width: 1
                    }
                  });
                  pointGraphic = new Graphic({
                    geometry: point,
                    symbol: markerSymbol
                  });
                  view.graphics.add(pointGraphic);
                });
              })
              .catch(function (error) {
                  console.log(error.response);
              });
            })();
          } else if (event.target.id === "assault") {

             // if (event.target.checked == true) {

           (async () => {
               const data = await fetch('/geoloc/AGGRAVATED ASSAULT', {
               method: 'GET',
               headers: {
                 'Authorization': token
               }
              }).then((response) => {
               return response.json();
             }).then(data => {
               console.log(data)
               // view.graphics.removeAll()
               data.data.forEach(function(element) {
                 const mydata = JSON.stringify(element)
                 const mlydata = mydata.substr(0, mydata.indexOf('}'))
                 const myresult = mlydata.substring(13)
                 const lat = myresult.substr(1,myresult.indexOf(','))
                 const titilat = (lat.length-1)
                 const lng = myresult.split(",")[1]
                 const longi = lng.replace(')','')
                 var point = new Point({
                   longitude: longi,
                   latitude: lat
                 });
                 var markerSymbol = new SimpleMarkerSymbol({
                   color: [26, 224, 49, 0.40],
                   outline: {
                     color: [26, 224, 49, 0.40],
                     width: 1
                   }
                 });
                 pointGraphic = new Graphic({
                   id: "assault",
                   geometry: point,
                   symbol: markerSymbol,
                 });
                 view.graphics.add(pointGraphic);
               });
             })
             .catch(function (error) {
                 console.log(error.response);
             });
           })();

       } else if (event.target.id === "clear") {
         view.graphics.removeAll()
       }

          })
         view.ui.add(document.getElementById("controls"), "bottom-right");
       });
    },
    methods: {
      async GetAllreport() {
        console.log('GetReport')
        try {
          await this.$store.dispatch('GetAllreport', {
            token: this.token,
          })
        } catch (e) {
          this.formError = e.message
        }
      },
      async GetGeoloc() {
          try {
            console.log('try')
             this.$store.dispatch('GetGeolocbyInsident', {
              token: this.token,
              insident: valueClicked
          })
        } catch (e) {
          console.log('catch')
          this.formError = e.message
        }
      }
     }
}
</script>
 <style>
  #viewDiv {
    height: 500px;
    width: 100%;
  }
   #controls {
      padding: 10px;
      padding-top: 13px;
      /* background-color: rgba(255, 255, 255, 0.6); */
    }

.esri-ui-bottom-right {
  margin-bottom: -5px;
  margin-right: 25%;
}
  .control_buttons_vandalism {
  margin-right: 0;
  -webkit-animation-name: bluePulse;
  -webkit-animation-duration: 3s;
  -webkit-animation-iteration-count: infinite;
}

@-webkit-keyframes bluePulse {
  from { background-color: rgba(0, 231, 255, 0.30); -webkit-box-shadow: 0 0 9px rgba(0, 231, 255, 0.40); }
  50% { background-color: rgba(0, 231, 255, 0.30); -webkit-box-shadow: 0 0 9px #9df1f9; }
  to { background-color: rgba(0, 231, 255, 0.30); -webkit-box-shadow: 0 0 9px rgba(0, 231, 255, 0.40); }
}

  .control_buttons_gta {
  margin-right: 0;
  -webkit-animation-name: whitePulse;
  -webkit-animation-duration: 3s;
  -webkit-animation-iteration-count: infinite;
}

@-webkit-keyframes whitePulse {
  from { background-color: rgba(255, 255, 255, 0.30); -webkit-box-shadow: 0 0 9px rgba(255, 255, 255, 0.40); }
  50% { background-color: rgba(255, 255, 255, 0.30); -webkit-box-shadow: 0 0 9px #fff; }
  to { background-color: rgba(255, 255, 255, 0.30); -webkit-box-shadow: 0 0 9px rgba(255, 255, 255, 0.40); }
}

.control_buttons_robbery {
margin-right: 0;
-webkit-animation-name: purplePulse;
-webkit-animation-duration: 3s;
-webkit-animation-iteration-count: infinite;
}

@-webkit-keyframes purplePulse {
from { background-color: rgba(255, 153, 255, 0.30); -webkit-box-shadow: 0 0 9px rgba(255, 153, 255, 0.40); }
50% { background-color: rgba(255, 153, 255, 0.30); -webkit-box-shadow: 0 0 9px #f9cff9; }
to { background-color: rgba(255, 153, 255, 0.30); -webkit-box-shadow: 0 0 9px rgba(255, 153, 255, 0.40); }
}

.control_buttons_drugs {
margin-right: 0;
-webkit-animation-name: orangePulse;
-webkit-animation-duration: 3s;
-webkit-animation-iteration-count: infinite;
}

@-webkit-keyframes orangePulse {
from { background-color: rgba(244, 131, 66, 0.30); -webkit-box-shadow: 0 0 9px rgba(244, 131, 66, 0.40); }
50% { background-color: rgba(244, 131, 66, 0.30); -webkit-box-shadow: 0 0 9px #f9b790; }
to { background-color: rgba(244, 131, 66, 0.30); -webkit-box-shadow: 0 0 9px rgba(244, 131, 66, 0.40); }
}

.control_buttons_assault {
margin-right: 0;
-webkit-animation-name: greenPulse;
-webkit-animation-duration: 3s;
-webkit-animation-iteration-count: infinite;
}

@-webkit-keyframes greenPulse {
from { background-color: rgba(26, 224, 49, 0.30); -webkit-box-shadow: 0 0 9px rgba(26, 224, 49, 0.40); }
50% { background-color: rgba(26, 224, 49, 0.30); -webkit-box-shadow: 0 0 9px #8df499; }
to { background-color: rgba(26, 224, 49, 0.30); -webkit-box-shadow: 0 0 9px rgba(26, 224, 49, 0.40); }
}

.control_buttons_clear {
margin-right: 0;
-webkit-animation-name: redPulse;
-webkit-animation-duration: 3s;
-webkit-animation-iteration-count: infinite;
}

@-webkit-keyframes redPulse {
from { background-color: rgba(255, 0.5, 0, 0.30); -webkit-box-shadow: 0 0 9px rgba(255, 0.5, 0, 0.40); }
50% { background-color: rgba(255, 0.5, 0, 0.30); -webkit-box-shadow: 0 0 9px #f99092; }
to { background-color: rgba(255, 0.5, 0, 0.30); -webkit-box-shadow: 0 0 9px rgba(255, 0.5, 0, 0.40); }
}

</style>
