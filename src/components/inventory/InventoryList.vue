<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Inventory List</h4>
      <ul class="list-group">
        <li class="list-group-item"
            :class="{ active: index === currentIndex }"
            v-for="(inventory, index) in inventories"
            :key="index"
            @click="setActiveInventory(inventory, index)">
          {{ inventory.name }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentInventory">
        <h4>Inventory</h4>
        <div>
          <label><strong>Name:</strong></label> {{ currentInventory.name }}
        </div>

        <a class="badge badge-warning"
           :href="'/inventories/' + currentInventory.id">
          Edit
        </a>
      </div>
      <div v-else>
        <br/>
        <p>Please click on an Inventory...</p>
      </div>
    </div>
  </div>
</template>

<script>
import InventoryDataService from "@/services/InventoryDataService";

export default {
  name: "inventory-list",
  data() {
    return {
      inventories: [],
      currentInventory: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveInventories() {
      InventoryDataService.getAll()
          .then(response => {
            this.inventories = response.data;
          })
          .catch(e => {
            console.log("step 2: ", e);
            //TODO: ERROR popup
          })
    },
    setActiveInventory(inventory, index) {
      this.currentInventory = inventory;
      this.currentIndex = index;
    },
    refreshList() {
      this.retrieveInventories();
      this.currentInventory = null;
      this.currentIndex = -1;
    }
  },
  mounted() {
    this.retrieveInventories();
  }
}
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>