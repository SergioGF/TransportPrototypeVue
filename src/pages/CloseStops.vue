<template>
    <card class="card-map" title="Close Stops">
      <p> These are the closest bus stops next to your location.</p>
      <div v-show="spinnerDis">
        <b-spinner label="Spinning"></b-spinner>
      </div>
      <div class="map" v-show="mapDis">
        <gmap-map
          :center="center"
          :zoom="17"
          style="width:100%;  height: 400px;"
        >
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            @click="toggleInfoWindow(m,index)"
          ></gmap-marker>
          <gmap-info-window
            :options="infoOptions"
            :position="infoWindowPos"
            :opened="infoWinOpen"
            @closeclick="infoWinOpen=false"
          >
          <div v-html="infoContent"></div>
          </gmap-info-window>
        </gmap-map>
      </div>
    </card>
</template>
<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueResource)
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDtDhERr6lE5ZeIsDAg0R0n2fde4-QPCxU",
    libraries: "places" // necessary for places input
  }
})
export default {
name: 'closeStops',
  data () {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 40.4170158, lng: -3.7040859 },
      markers: [],
      places: [],
      currentPlace: null,
      infoWinOpen: false,
      currentMidx: null,
      infoContent: '',
      infoOptions: {
        pixelOffset: {
        width: 0,
        height: -35
        }
      },
      infoWindowPos: {
        lat: 0,
        lng: 0,
        name: null,
        description: null
      },
      spinnerDis: true,
      mapDis: false
    }
  },
  methods: {
      // receives a place object via the autocomplete component
      setPlace(place) {
        this.currentPlace = place;
      },
      addMarker(long,latit,name,desc) {
          const marker = {
            lat: latit,
            lng: long,
            name: name,
            description: desc
          }
          this.markers.push({ position: marker , name: name, description: desc });
          this.places.push(this.currentPlace)
          this.center = marker
          this.currentPlace = null
      },
      geolocate: function() {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
      },
      toggleInfoWindow: function (marker, idx) {
        this.infoWindowPos = marker.position;
        this.infoContent = this.getInfoWindowContent(marker);
        

        //check if its the same marker that was selected if yes toggle
        if (this.currentMidx == idx) {
          this.infoWinOpen = !this.infoWinOpen;
        }
        //if different marker set infowindow to open and reset current marker index
        else {
          this.infoWinOpen = true;
          this.currentMidx = idx;
        }
      },

      getInfoWindowContent: function (marker) {
        return (`<div class="card">
        <div>
          <figure class="image is-4by3">
            <img src="https://i0.wp.com/cdna.c3dt.com/icon/248357-com.emtmadrid.emt.png" alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="content">${marker.name}</p>
            </div>
          </div>
          <div class="content">
            ${marker.description}
          </div>
        </div>
      </div>`)
    }
  },
  mounted () {
    this.$http.get('https://openapi.emtmadrid.es/v1/mobilitylabs/user/login', {responseType: 'json', headers: {'email': 'mrsergiogf@gmail.com', 'password': 'Sergio18', 'X-ApiKey': 'a964005d-56ab-42af-be94-fe77c4d7df77', 'X-ClientId': 'fb43dc15-182d-4b2c-be4d-da9ad36a24a7'}}).then(response => {
       this.$http.get('https://openapi.emtmadrid.es/v1/transport/busemtmad/stops/arroundxy/-3.7040859/40.4170158/200/', {responseType: 'json', headers: {'accessToken': response.body.data[0].accessToken}}).then(response => {
        var data = response.body.data[0]
        for(var i=0;i < data.stops.length;i++){
          var lat = data.stops[i].geometry.coordinates[0]
          var long = data.stops[i].geometry.coordinates[1]
          var name = data.stops[i].name
          var description = data.stops[i].postalAddress
          this.markers.push({'name': name,'description': description})
          this.addMarker(lat,long,name,description)
          this.spinnerDis = false
          this.mapDis = true
        }
      }, response => {
        alert('error2')
      })
    }, response => {
      // error callback
      alert('error')
    })
    // this.$router.replace('login')
    // this.geolocate();
  }
}
</script>
<style>
</style>
