<template>
  <div class="dashboard">
    <b-alert :show="isError" dismissible variant="danger">{{err}}</b-alert>

    <b-row>
      <b-col sm="3">    
        <h3>Coming Request</h3>
        <b-list-group>
          <b-list-group-item 
            variant="info"
            v-for="req in requestList"
            v-bind:class="{'active' : requestSelected._id === req._id}" 
            :key="req._id" 
            class="table-request" 
            button @click="selected(req._id)">
              {{ req.clientName }}
            </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col sm="9">
        <h3>Request Infomation</h3>

        <b-row>
          <b-col sm="7">
            <span>Address:</span>
            <b-form-input disabled v-model="requestSelected.address"></b-form-input>
          </b-col>
          <b-col sm="5">
            <span>Note:</span>
            <b-form-textarea disabled v-model="requestSelected.note"></b-form-textarea>
          </b-col>
        </b-row>
        <b-row>
              <Map :position="position" v-on:changePosition="changePosition"/>
        </b-row>
        <b-row>
            <b-button variant="warning" style="margin: 15px; width:100%;" @click="submitRequest">Submit Request</b-button>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import config from "../lib/config.json";
const myConfig = config['dev'];
var myInterval = false;
import Map from "./Map.vue";

export default {
  name: 'dashboard',
  props: [
    'getRefreshtoken',
    'setLogin'
  ],
  data: function() {
    return {
      requestList: [],
      err: '',
      isError: false,
      requestSelected: {
        _id: '',
        address: '',
        note: ''
      },
      position: {
        lat: 10.823099,
        lng: 106.629664
      }
    }
  },
  methods: {
    fetchRequest() {
        const self = this;
        self.$http.get(myConfig.host + "api/request?state=CHUA_DINH_VI", {headers: { Authorization: `Bearer ${localStorage.accessToken}`}})
        .then(res => {
          if(res.data.success) {
            self.requestList = res.data.data;
          }
        })
        .catch(async (err) => {
          self.isError = true;
          self.err = err.response.data;
          if(err.response.status === 401) {
            await self.getRefreshtoken();
            self.$http.get(myConfig.host + "api/request?state=CHUA_DINH_VI", {headers: { Authorization: `Bearer ${localStorage.accessToken}`}})
            .then(res => {
              if(res.data.success) {
                self.requestList = res.data.data;
              }
            })
          }
        });


        myInterval = setInterval(() => {
          self.$http.get(myConfig.host + "api/request?state=CHUA_DINH_VI", {headers: { Authorization: `Bearer ${localStorage.accessToken}`}})
            .then(res => {
              if(res.data.success) {
                self.requestList = res.data.data;
              }
            })
            .catch(async (err) => {
              self.isError = true;
              self.err = err.response.data;
              if(err.response.status === 401) {
                await self.getRefreshtoken();
                self.$http.get(myConfig.host + "api/request?state=CHUA_DINH_VI", {headers: { Authorization: `Bearer ${localStorage.accessToken}`}})
                .then(res => {
                  if(res.data.success) {
                    self.requestList = res.data.data;
                  }
                })
              }
            });
        }, 3000);
    },
    selected(id) {
      const self = this;
      self.requestSelected = self.requestList.find(req => req._id === id);
      self.$http.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: self.requestSelected.address,
          key: 'AIzaSyD-0eAWpyN2vKvNtORrbm89YfaSzkcbjf4'
        }
      })
      .then(res => {
        self.position = res.data.results[0].geometry.location;
      });
    },
    changePosition(address) {
      const self = this;
      self.requestSelected.address = address;
      self.$http.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: address,
          key: 'AIzaSyD-0eAWpyN2vKvNtORrbm89YfaSzkcbjf4'
        }
      })
      .then(res => {
        self.position = res.data.results[0].geometry.location
      })
    },
    submitRequest() {
      const self = this;
      self.$http.put(`${myConfig.host}api/request/located/${self.requestSelected._id}`,{state: "DA_DINH_VI", lat: self.position.lat, lng: self.position.lng},{headers: {Authorization: `Bearer ${localStorage.accessToken}`}})
        .catch(async (err) => {
          if(err.response.status === 401) {
            await self.getRefreshtoken();
            self.$http.put(`${myConfig.host}api/request/state/${self.requestSelected._id}`,{state: "DA_DINH_VI"},{headers: {Authorization: `Bearer ${localStorage.accessToken}`}})
          }
      })

      for (let i = 0; i < self.requestList.length; i++) {
        if (self.requestList[i]._id == self.requestSelected._id) {
          self.requestList.splice(i, 1);
          //reset requestSelected
          self.requestSelected = {_id: '', address: '', note: '', position: { lat: 0, lng: 0} }
          //reset position
          self.position = { lat: 0, lng: 0}
        }
      }
    }
  },
  beforeMount() {
    this.fetchRequest();
  },
  beforeDestroy() {
    clearInterval(myInterval);
  },
  components: {
    Map
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 
.table-request {
    background-color: transparent;
}

</style>
