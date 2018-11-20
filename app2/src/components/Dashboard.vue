<template>
  <div class="dashboard">
    <b-row>
      <b-col sm="4">    
        <h3>Coming Request</h3>
        <b-list-group>
          <b-list-group-item class="table-request">Cras justo odio</b-list-group-item>
          <b-list-group-item class="table-request">Dapibus ac facilisis in</b-list-group-item>
          <b-list-group-item class="table-request">Morbi leo risus</b-list-group-item>
          <b-list-group-item class="table-request">Porta ac consectetur ac</b-list-group-item>
          <b-list-group-item class="table-request">  Vestibulum at eros</b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col sm="8">
        <b-button @click="hello" type="button">Test</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  name: 'dashboard',
  props: {

  },
  data: function() {
    return {

    }
  },
  methods: {
    hello () {
      alert("hello")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 
.table-request {
    background-color: transparent;
}

</style>
