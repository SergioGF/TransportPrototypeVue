<template>
  <div class="row">
    <div class="col-12">
      <card>
          <div id="app">
            <b-form>
              <div id="autocomplete" class="autocomplete">
              <b-form-group
                id="input-group-1"
                label="Check how many people search your stop."
                label-for="input-1"
              >
              <autocomplete
                  :search="search"
                  placeholder="Search for a stop"
                  aria-label="Search for a stop"
                  :get-result-value="getResultValue"
                  @submit="handleSubmit"
              ></autocomplete>
              </b-form-group>
              </div>
            </b-form>
            <div v-show="spinnerDis">
              <b-spinner label="Spinning"></b-spinner>
            </div>
            <div v-show="chartDis">
              <fusioncharts
                :type="type"
                :width="width"
                :height="height"
                :dataFormat="dataFormat"
                :dataSource="dataSource"
              ></fusioncharts>
              </div>
          </div>
      </card>
    </div>
  </div>
</template>

<script src="https://cdn.fusioncharts.com/fusioncharts/latest/fusioncharts.js"></script>
<script>
/* eslint-disable */
import Vue from 'vue';
import VueFusionCharts from 'vue-fusioncharts'
import FusionCharts from 'fusioncharts'
import Charts from 'fusioncharts/fusioncharts.charts'
//import the theme
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
import VueResource from 'vue-resource'
import firebase from 'firebase'
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'

// register VueFusionCharts component
Vue.use(VueFusionCharts, FusionCharts, Charts, FusionTheme)
Vue.use(VueResource)
Vue.use(Autocomplete)
// Your web app's Firebase configuration

// Initialize Firebase
var db
var aux = []
var dataSource = {
    "chart": {
        "caption": "People have checked the stop",
        "subCaption": "In Ppl = People",
        "xAxisName": "Stop",
        "yAxisName": "People",
        "numberSuffix": "p",
        "yAxisMinValue": "0",
        "theme": "fusion"
    },
    "annotations": {
    "groups": [
      {
        "id": "anchor-highlight",
        "items": [
          {
            "id": "high-star",
            "type": "spline",
            "x": "$dataset.0.set.2.x",
            "y": "$dataset.0.set.2.y",
            "radius": "12",
            "color": "#6baa01",
            "border": "2",
            "borderColor": "#f8bd19"
          }
        ]
      }
    ]
  },
    "data": null
}
export default {
  name: 'Graphics',
  searchs: [],
  selected: '',
  dataSource: dataSource,
  components: {
    Autocomplete
  },
  data(){
    return {
      width: '100%',
      height: '400',
      type: 'spline',
      dataFormat: 'json',
      dataSource: dataSource,
      id: '',
      names: [],
      nameStop: null,
      spinnerDis: true,
      chartDis: false,
      auxComplete: []
    }
  },
  computed: {
  },
  methods: {
    initDB(){
    var vm = this
    db = firebase.database()
    var aux = []
    var namesAux = []
    db.ref('data/').on('value', function (snapshot) {
            var objeto = snapshot.val();
            var name;
            var count;
            for (var i = 0; i <objeto.length; i++) {
              name = objeto[i].name
              if(objeto[i].count == null){
                count = 0
              } else {
                count = objeto[i].count
              }
              if(i < 20){ //Summary, 20 firsts.
                aux.push({'label':name, 'value': count})
              }
              vm.auxComplete.push({'label':name, 'value': count})
              namesAux.push({'name':name, 'idStop':i})
            }
    })
    setTimeout(function(){
      const data = Object.assign({}, vm.dataSource) //clone data
        data.data = aux
        vm.dataSource = data
        vm.names = namesAux
        vm.chartDis = true
        vm.spinnerDis = false
        //this.dataSource.render('chart-container', undefined, callback)
    }, 2000);
    },
    search(input) {
      if (input.length < 1) { return [] }
      var vm = this
      var names = []
      for(var i = 0; i < vm.names.length; i++)
        names.push(vm.names[i].name)
      return names.filter(name => {
        return name.toLowerCase().
        startsWith(input.toLowerCase());
      });
    },
    getResultValue(result) {
      return result
    },
    handleSubmit(result) {
      var numSearchs
      var vm = this
      var stops = vm.auxComplete
      var i=0
      var ok=false
      var idStop
      while(i < stops.length && !ok){
        if(stops[i].label == result){
          stops[i].value +=1
          var countStop = []
          countStop.push({'label':result, 'value':stops[i].value})
          vm.type = 'column2d'
          vm.dataSource.data = countStop
          ok = true
          idStop = vm.names[i].idStop
        }
        i++
      }
        var query= db.ref('data/' + idStop)
        query.update({count: stops[i-1].value})
    }
  },
  mounted(){
    this.initDB()
  }
}
</script>
