<template>
    <div class="row">
      <div class="col-12">
        <card :title="table1.title" :subTitle="table1.subTitle">
                    <b-form>
            <div id="autocomplete" class="autocomplete">
            <b-form-group
              id="input-group-1"
              label-for="input-1"
            >
            <autocomplete
                :search="search"
                placeholder="Search the stop"
                aria-label="Search the stop"
                :get-result-value="getResultValue"
                @submit="handleSubmit"
            ></autocomplete>
            </b-form-group>
            </div>
          </b-form>
          <b-table
              selectable
              :select-mode="selectMode"
              selectedVariant="success"
              :fields="fields"
              @row-selected="rowSelected"
              responsive="sm"
              :items="items"
              :busy="isBusy"
              class="mt-3"
              striped
              bordered
              outlined>
              <template slot="selected" slot-scope="{ rowSelected }">
                <span v-if="rowSelected">✔</span>
              </template>
                <div slot="table-busy" class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
            </b-table>
            <div class="text-center">
              <b-button squared variant="success" @click="handleDownload()" :disabled=isDisabled>Download</b-button>
            </div>
          
        </card>
      </div>
    </div>
</template>
<script>
import { PaperTable } from "@/components";
import Vue from 'vue'
import VueResource from 'vue-resource'
import firebase from 'firebase'
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
import GoogleSpreadsheet from 'google-spreadsheet'
Vue.use(VueResource)
Vue.use(Autocomplete)
Vue.use(GoogleSpreadsheet)
const tableColumns = ['Line', 'Destination', 'Estimate Arrive', 'Distance Bus'];
const tableData = [
  {
    line: 15,
    destination: "Dakota Rice",
    estimate_arrive: "$36.738",
    distance_bus: "Niger",
  },
  {
    line: 92,
    destination: "Minerva Hooper",
    estimate_arrive: "$23,789",
    distance_bus: "Curaçao",
  },
  {
    line: 38,
    destination: "Sage Rodriguez",
    estimate_arrive: "$56,142",
    distance_bus: "Netherlands",
  },
  {
    line: 7,
    destination: "Philip Chaney",
    estimate_arrive: "$38,735",
    distance_bus: "Netherlands",
  }
];
export default {
    name:'Schedule',
    components: {
      Autocomplete,
      PaperTable
    },
    data(){
        return{
          isBusy: false,
          fields: ['Line', 'Destination', 'Estimate Arrive', 'Distance Bus'],
          items: [{},{},{},{}],
          selectMode: 'multi',
          selected: [],
          namesAux: [],
          show: true,
          isInit: false,
          isSignIn: false,
          info: null,
          validated: true,
          table1: {
            title: "Schedule",
            subTitle: "Buses that are going to arrive.",
            columns: [...tableColumns],
            data: [...tableData]
          }    
        }
    },
    computed: {
      isDisabled() {
        // evaluate whatever you need to determine disabled here...
        return this.validated;
      }
    },
    methods:{
        initDB(){
          var vm = this
          var db = firebase.database()
          db.ref('data/').on('value', function (snapshot) {
            var objeto = snapshot.val();
            var name;
            for (var i = 0; i < objeto.length; i++) {
              name = objeto[i].name
              vm.namesAux.push({'name':name, 'idStop':i})
            }
          })
        },
        getData(idStop){
          var bodyJSON = "{'\n      \'statistics\':\'Y\',\n      \'cultureInfo\':\'EN\',\n      \'Text_StopRequired_YN\':\'Y\',\n      \'Text_EstimationsRequired_YN\':\'Y\',\n      \'Text_IncidencesRequired_YN\':\'Y\',\n      \'DateTime_Referenced_Incidencies_YYYYMMDD\':\'20190728\'\n'}"
            this.$http.get('https://openapi.emtmadrid.es/v1/mobilitylabs/user/login', {responseType: 'json', headers: {'email': 'mrsergiogf@gmail.com', 'password': 'Sergio18', 'X-ApiKey': 'a964005d-56ab-42af-be94-fe77c4d7df77', 'X-ClientId': 'fb43dc15-182d-4b2c-be4d-da9ad36a24a7'}}).then(response => {
                this.$http.post('https://openapi.emtmadrid.es/v1/transport/busemtmad/stops/'+ idStop + '/arrives/all/', {headers: {'accessToken': response.body.data[0].accessToken}, body: {"mode": "raw", "raw": bodyJSON}})
                .then(response => {
                    var data = response.body.data[0]
                }, response => {
                    console.log('error2')
                    })
            }, response => {
                // error callback
                    console.log('error')
                })
        },
        rowSelected(items){
          this.selected = items
          if(this.selected.length > 0) this.validated = false
          else this.validated = true
        },
        search(input) { 
          if (input.length < 1) { return [] }
          var vm = this
          var names = []
          for(var i = 0; i < vm.namesAux.length; i++)
            names.push(vm.namesAux[i].name)
          return names.filter(name => {
            return name.toLowerCase().
            startsWith(input.toLowerCase());
          });
        },
        getResultValue(result) {
          return result
        },
        handleSubmit(result) {
          var vm = this
          var i = 0
          var ok = false
          var idStop
          while(i < vm.namesAux.length && !ok){
            if(vm.namesAux[i].name == result){
              idStop = vm.namesAux[i].idStop
              ok = true
            }
            i++
          }
          this.items = [{ Line: 15, Destination: 'Sol', 'Estimate Arrive': '< 1 min', 'Distance Bus': '105 m'},
          { Line: 92, Destination: 'Principe Pio', 'Estimate Arrive': '2 min', 'Distance Bus': '502 m'},
          { Line: 38, Destination: 'Tetuan', 'Estimate Arrive': '3 min', 'Distance Bus': '1125 m'},
          { Line: 7, Destination: 'Moncloa', 'Estimate Arrive': '6 min', 'Distance Bus': '2362 m'}]
          //this.getData(idStop)
        },
        handleDownload(){
          var vm = this
          var rowsSelected = vm.selected
          var GoogleSpreadsheet = require('google-spreadsheet')
          var doc = new GoogleSpreadsheet('1r5hLRn1jwQbJLkW8Q3D2bIR9QK2tk3vBNvSy3xx2xxY')
          var async = require('async')
          var sheet = null
          async.series([
              function setAuth (step) {
                var creds = require('./google-generated-creds.json')
                doc.useServiceAccountAuth(creds, step)
              },
              function getInfoAndWorksheets (step) {
                doc.getInfo(function (err, info) {
                  sheet = info.worksheets[0]
                  // removing a worksheet
                  //sheet.del(); //async
                  console.log(err)
                  step()
                })
              },
              function managingSheets(step) {
                sheet.resize({rowCount: 50, colCount: 4}); //async
                /*doc.addWorksheet({
                  title: 'Schedule EMT'
                }, function(err, shet) {
            
                  // change a sheet's title
                  sheet.setTitle('Schedule EMT'); //async
            
                  //resize a sheet
            
                  sheet.setHeaderRow(['Line', 'Destination', 'Estimate arrive', 'Distance Bus']); //async */        
                  step();
                //});
              },
              function workingWithCells (step) {
                sheet.getRows({
                  offset: 1,
                  limit: 50,
                  //orderby: 'col2'
                }, function (err, rows) {
                  sheet.getCells({
                    'min-row': 2, // starts in the second row
                    'max-row': 50,
                    'return-empty': true
                  }, function (err, cells) {
                    for(var a = 0; a < 50; a++) 
                      cells[a].value = ""
                    sheet.bulkUpdateCells(cells) // async
                    var i = 0
                    var ok = false
                    for(var j = 0; j < rowsSelected.length; j++){
                      cells[i].value = rowsSelected[j].Line
                      cells[i + 1].value = rowsSelected[j].Destination
                      cells[i + 2].value = rowsSelected[j]['Estimate Arrive']
                      cells[i + 3].value = rowsSelected[j]['Distance Bus']
                      /*var minEstimateArrive = Math.round(rowsSelected[j].estimate_arrive / 60)
                      if(minEstimateArrive == 0) minEstimateArrive = '< 1 min'
                      else minEstimateArrive = minEstimateArrive +  ' min'
                      cells[i + 2].value = minEstimateArrive
                      cells[i + 3].value = (rowsSelected[j].distance_bus + ' m')*/
                      i += 4 // NumColumns
                    }
                    sheet.bulkUpdateCells(cells) // async
                    window.open("https://docs.google.com/spreadsheets/d/1r5hLRn1jwQbJLkW8Q3D2bIR9QK2tk3vBNvSy3xx2xxY/edit#gid=509695719", "_blank")
                    console.log(err)
                  })
                  console.log(err)
                  step()
                })
              }
            ], function (err) {
              if (err) {
                console.log('Error: ' + err)
              }
            })
        },
        handleClickSignIn () {
          this.$gAuth.signIn()
            .then(user => {
              // On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
              console.log('user', this.googleusergetid)
              this.isSignIn = this.$gAuth.isAuthorized
            })
            .catch(error => {
              console.log(error)
              // On fail do something
            })
        },
        handleClickSignOut () {
          this.$gAuth.signOut()
            .then(() => {
              // On success do something
              this.isSignIn = this.$gAuth.isAuthorized
            })
            .catch(error => {
              console.log(error)
              // On fail do something
            })
        }
    },
    mounted(){
      this.initDB()
      let that = this
      let checkGauthLoad = setInterval(function () {
      that.isInit = that.$gAuth.isInit
      that.isSignIn = that.$gAuth.isAuthorized
      if (that.isInit) clearInterval(checkGauthLoad)
    }, 1000)
    }
}
</script>
<style>
</style>
