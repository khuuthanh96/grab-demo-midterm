<template>
    <div class="map">
        <GmapMap  
            :center="position"
            :zoom="17"
            map-type-id="terrain"
            style="width: 824px; height: 470px; margin-left: 15px"
            @click="handleMapClick">
            <GmapMarker 
                :position="position"
            />
        </GmapMap>
    </div>
</template>

<script>
export default {
    name: "map",
    props: [
      "position"
    ],
    methods: {
        handleMapClick(event) {
            const self=this
            self.position.lat = event.latLng.lat();
            self.position.lng = event.latLng.lng();
            self.$http.get("https://maps.googleapis.com/maps/api/geocode/json", {
                params: {
                latlng: self.position.lat +','+self.position.lng,
                key: 'AIzaSyBzpko9Lpfp1mkic--GLFEsKwPqTSq1AaA'
                }
            })
            .then(res => {
                self.$emit('changePosition', res.data.results[0].formatted_address);
            })
        }
    }
}
</script>

<style>
.map {
    margin-top: 10px;
    width: 100%;
}
</style>

