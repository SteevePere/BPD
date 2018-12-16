<template>
  <section class="container">
    <div id="viewDiv"/>
    <div id="controls">
      <b-button
        id="vandalism"
        size="sm"
        class="control_buttons"
        style="background-color: rgba(0, 231, 255, 0.40); border-radius: 5px 0 0 5px; border-color: rgba(0, 231, 255, 0); margin-right: -5px;"
      >Vandalism</b-button>
      <b-button
        id="gta"
        size="sm"
        class="control_buttons"
        style="background-color: rgba(255, 255, 255, 0.40); border-radius: 0 0 0 0; border-color: rgba(0, 231, 255, 0); margin-right: -5px;"
      >Auto Theft</b-button>
      <b-button
        id="robbery"
        size="sm"
        class="control_buttons"
        style="background-color: rgba(255, 153, 255, 0.40); border-radius: 0 0 0 0; border-color: rgba(0, 231, 255, 0); margin-right: -6px;"
      >Robbery</b-button>
      <b-button
        id="drugs"
        size="sm"
        class="control_buttons"
        style="background-color: rgba(244, 131, 66, 0.55); border-radius: 0 0 0 0; border-color: rgba(0, 231, 255, 0); margin-right: -5px;"
      >Drug Charges</b-button>
      <b-button
        id="assault"
        size="sm"
        class="control_buttons"
        style="background-color: rgba(26, 224, 49, 0.40); border-radius: 0 0 0 0; border-color: rgba(0, 231, 255, 0); margin-right: -6px;"
      >Assault</b-button>
      <b-button
        id="clear"
        size="sm"
        class="control_buttons"
        style="background-color: rgba(255, 0.5, 0, 0.40); border-radius: 0 5px 5px 0; border-color: rgba(0, 231, 255, 0);-"
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
          center: ['-71.04','42.36'],
          zoom: 13
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
         view.ui.add(document.getElementById("controls"), "top-right");
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

  .control_buttons {
    margin-right: 0;
  }
</style>
