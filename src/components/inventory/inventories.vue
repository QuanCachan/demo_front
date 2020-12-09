<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Inventory List</h4>
      <ag-grid-vue 
                   style="width: 250px; height: 200px;"
                   class="ag-theme-alpine"
                   rowSelection="single"
                  :gridOptions="gridOptions"
                   :columnDefs="columnDefs"
                   :rowData="inventories"
                   @cell-clicked="onCellClicked"
                   >
      </ag-grid-vue>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index === currentIndex }"
          v-for="(inventory, index) in inventories"
          :key="index"
          @click="setActiveInventory(inventory, index)"
        >
          {{ inventory.name }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentInventory">
        <h4>Inventory</h4>
        <div>
          <div>
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
                    <div
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
                    </div>
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
        </div>
      </div>
      <div v-else>
        <br />
        <p>Please click on an Inventory...</p>
      </div>
    </div>
  </div>
</template>

<script>
import InventoryDataService from "@/services/InventoryDataService";
import ZoneDataService from "@/services/ZoneDataService";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {AgGridVue} from 'ag-grid-vue';

export default {
  name: "inventories",
  data() {
    return {
      gridOptions: null,
      gridApi: null,
      inventories: [],
      currentInventory: null,
      currentIndex: -1,
      title: "",
    };
  },
  components: {
    AgGridVue
  },
  computed: {
    currentInventoryZones() {
      return this.currentInventory.zones;
    },
  },
  methods: {
    onCellClicked(){  
       let selectedNodes = this.gridApi.getSelectedNodes();
      let selectedData = selectedNodes.map(node => node.data);
      alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`);
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
      this.currentIndex = -1;
    },
  },
  beforeMount() {
     this.gridOptions = {};
    this.columnDefs = [
      {
        headerName: 'Name',
        field: 'name',
        filter: true,
        cellRendererParams: {
          clicked: function(field) {
            alert(`${field} was clicked`);
          }
        }
      }
    ];
  },
  mounted() {
    this.gridApi = this.gridOptions.api;

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