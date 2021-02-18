<template>
  <div class="col-md-3">
    <div class="">
      <p>Location list</p>
      <div class="">
        <li v-for="(location) in locations" v-bind:key="location.id">{{location.id}}</li>
      </div>
    </div>
  </div>
</template>

<script>
import {FETCH_LOCATIONS} from "@/store/actions.type";

export default {
  name: "locations",
  beforeMount () {
    this.$store.dispatch(FETCH_LOCATIONS)
  },
  computed: {
    locations () {
      return this.$store.state.locations.locations;
    }
  }
}
</script>

<style>

</style>