<template>
  <div class="row">
    <div class="col-sm">
      <h4>Inventory List</h4>
      <ag-grid-vue
        style="width: 250px; height: 200px"
        class="ag-theme-alpine"
        rowSelection="single"
        :gridOptions="inventoryGridOptions"
        :columnDefs="columnDefs"
        :rowData="inventories"
        @cell-clicked="onInventoryCellClicked"
      >
      </ag-grid-vue>
    </div>
    <div class="col-sm">
      <div v-if="currentInventory">
        <h4>Inventory</h4>

        <div class="card" style="width: 23rem">
          <div class="card-body">
            <div class="card-text vertical-alignment">
              <label><strong>Name:</strong></label>
              {{ currentInventory.name }} <br />
              <label><strong>Description:</strong></label>
              {{ currentInventory.description }} <br />
              <label><strong>Created date:</strong></label>
              {{ currentInventory.createdDate }} <br />
              <div v-if="currentInventory.zones">
                <!--<div
                      class="list-group-item"
                      v-for="(zone, index) in currentInventoryZones"
                      :key="index"
                    >
                      {{ zone.name }} <br />
                      {{ zone.description }} <br />
                      {{ zone.createdDate }} <br />
                      <a
                        class="badge badge-warning"
                        :href="'/zones/' + zone.id"
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        class="badge btn-danger"
                        @click="deleteZone(zone.id, index)"
                        >Delete</a
                      >
                    </div> -->
                <ag-grid-vue
                  style="width: 250px; height: 200px"
                  class="ag-theme-alpine"
                  rowSelection="single"
                  :gridOptions="zoneGridOptions"
                  :columnDefs="columnDefs"
                  :rowData="currentInventory.zones"
                  @cell-clicked="onZoneCellClicked"
                >
                </ag-grid-vue>
              </div>
            </div>

            <a
              class="badge badge-warning"
              :href="'/inventories/' + currentInventory.id"
            >
              Edit
            </a>
            <a
              href="#"
              class="badge btn-danger"
              @click="deleteInventory(currentInventory.id)"
              >Delete</a
            >
          </div>
        </div>
      </div>
      <div v-else>
        <br />
        <p>Please click on an Inventory...</p>
      </div>
    </div>

    <div class="col">
      <div v-if="currentZone">
        <h4>Zone</h4>
        <div class="card" style="width: 23rem">
          <div class="card-body">
            <div class="card-text">
              <label><strong>Name:</strong></label>
              {{ currentZone.name }} <br />
              <label><strong>Description:</strong></label>
              {{ currentZone.description }} <br />
              <label><strong>Created date:</strong></label>
              {{ currentZone.createdDate }} <br />
            </div>
          </div>        
        </div>
          <a
                        class="badge badge-warning"
                        :href="'/zones/' + currentZone.id"
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        class="badge btn-danger"
                        @click="deleteZone(currentZone.id, index)"
                        >Delete</a
                      >
      </div>
    </div>
  </div>
</template>

<script>
import InventoryDataService from "@/services/InventoryDataService";
import ZoneDataService from "@/services/ZoneDataService";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";

export default {
  name: "inventories",
  data() {
    return {
      inventoryGridOptions: null,
      zoneGridOptions: null,
      inventoryGridApi: null,
      zoneGridApi: null,
      inventories: [],
      currentInventory: null,
      currentZone: null,
      currentIndex: -1,
      title: "",
    };
  },
  components: {
    AgGridVue,
  },
  computed: {
    currentInventoryZones() {
      return this.currentInventory.zones;
    },
  },
  methods: {
    onInventoryCellClicked(e) {
      let selectedNodes = this.inventoryGridApi.getSelectedNodes();
      let selectedData = selectedNodes.map((node) => node.data)[0];
      this.setActiveInventory(selectedData, e.rowIndex);
    },
    onZoneCellClicked(e) {
      this.zoneGridApi = this.zoneGridOptions.api;

      let selectedNodes = this.zoneGridApi.getSelectedNodes();
      let selectedData = selectedNodes.map((node) => node.data)[0];
      this.currentZone = selectedData;
      console.log(e.rowIndex);
          this.$forceUpdate();
    },
    retrieveInventories() {
      InventoryDataService.getAll()
        .then((response) => {
          this.inventories = response.data;
        })
        .catch((e) => {
          console.log("step 2: ", e);
          //TODO: ERROR popup
        });
    },
    setActiveInventory(inventory, index) {
      console.log("inventoryId", inventory.id);
      this.currentInventory = inventory;
      this.currentIndex = index;
      ZoneDataService.getZonesByInventoryId(inventory.id)
        .then((response) => {
          console.log("zones", response.data);
          this.currentInventory.zones = response.data;
          this.currentZone = null;
          this.$forceUpdate();
        })
        .catch((e) => {
          console.log("step 2: ", e);
          //TODO: ERROR popup
        });
    },
    deleteZone(zoneId, index) {
      ZoneDataService.deleteZone(zoneId)
        .then((response) => {
          console.log(response);
          console.log(index);
          if (response.status === 200) {
            this.currentInventory.zones.splice(index, 1);
            this.currentZone=null;
            this.$forceUpdate();
          }
        })
        .catch((e) => {
          console.log("step 2: ", e);
          //TODO: ERROR popup
        });
    },
    deleteInventory(inventoryId) {
      InventoryDataService.deleteInventory(inventoryId)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.inventories.splice(this.currentIndex, 1);
            this.currentInventory = null;
             this.currentZone = null;
            this.$forceUpdate();
          }
        })
        .catch((e) => {
          console.log("step 2: ", e);
          //TODO: ERROR popup
        });
    },
    refreshList() {
      this.retrieveInventories();
      this.currentInventory = null;
      this.currentZone = null;
      this.currentIndex = -1;
    },
  },
  beforeMount() {
    this.inventoryGridOptions = {};
    this.zoneGridOptions = {};
    this.columnDefs = [
      {
        headerName: "Name",
        field: "name",
        filter: true,
      },
    ];
  },
  mounted() {
    this.inventoryGridApi = this.inventoryGridOptions.api;
    this.retrieveInventories();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>