<template>
  <section class="container">
    <div id="viewDiv"/>
    <div id="controls">
      <input
        id="vandalism"
        type="radio"
        name="crime"
        checked> <label for="vandalism">Vandalism</label>
      <input
        id="arrests"
        type="radio"
        name="crime">
      <label for="arrests">Warrant Arrests</label>
      <input
        id="gather"
        type="radio"
        name="crime">
      <label for="gather">Other</label>
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
        formError: null
      }
    },
    middleware : 'auth',
      mounted() {
      console.log('map: monted')
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
          color: [212, 119, 40],
          outline: {
            color: [255, 255, 255],
            width: 1
          }
        });

        // Create a graphic and add the geometry and symbol to it
        var pointGraphic = new Graphic({
          geometry: point,
          symbol: markerSymbol
        });

        view.graphics.add(pointGraphic);


        document.getElementById("controls").addEventListener("click", function(event) {
          let valueClicked;
          if (event.target.id === "vandalism") {
            console.log('vandalism')
            valueClicked = vandalism;
          } else if (event.target.id === "arrests") {
            console.log('arrests')
            valueClicked = arrests;
          } else if (event.target.id === "gather") {
            valueClicked = gather;
            console.log('gather')
          }
          if(valueClicked){
            console.log('of')
          }

        })



        view.ui.add(document.getElementById("controls"), "top-right");


      });
      this.GetAllreport()
    },
    methods: {
       titi(){
        console.log("oko")
      },
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
      background-color: rgba(255, 255, 255, 0.6);
    }
</style>
