<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search location by name/Id"
               v-model="inventoryName"/>

        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
                  @click="searchByName">
            Search
          </button>
        </div>
      </div>
      <div class="mb-3">
        <button @click="openCreateInventoryDialog" class="btn btn-success" type="button">Add Location</button>
      </div>
    </div>

    <div class="col-md-6">
      <h4>Location List</h4>
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
  },
  data() {
    return {
      inventoryName: "",
      isCreatingInventory: false,
    }
  },
  methods: {
    searchByName() {
    },
    openCreateInventoryDialog() {
      this.isCreatingInventory = true;
    },
  }
}
</script>

<style>
.list {
  text-align: left;
  margin: auto;
}
</style>