<template>
  <div>
    <!-- Modal -->
    <div v-if="isDisplayModal && currentZone">
      <div
        class="modal centered"
        tabindex="-1"
        role="dialog"
        style="display: block"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Zone {{ currentZone.publicId }}</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                v-on:click="closeModal()"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div v-if="currentZone">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Name</span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Zone name"
                    aria-label="Name"
                    aria-describedby="basic-addon1"
                    v-model="currentZone.name"
                  />
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      >Description</span
                    >
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Description"
                    aria-label="Description"
                    aria-describedby="basic-addon1"
                    v-model="currentZone.description"
                  />
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      >Created date</span
                    >
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Created date"
                    aria-label="Created date"
                    aria-describedby="basic-addon1"
                    v-model="currentZone.createdDate"
                    disabled="true"
                  />
                </div>
                <div class="d-flex flex-row p3">
                  <a
                    href="#"
                    class="badge btn-danger p3"
                    @click="deleteZone(currentZone.id)"
                    >Delete</a
                  >
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                v-on:click="updateZone"
              >
                Save changes
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                v-on:click="closeModal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <h4 style="width: 202px">Inventory List</h4>
        <div class="container">
          <div class="row row-cols-2 row-margin-05">
            <div v-for="inventory in inventories" :key="inventory.id">
              <div class="col-md-12" style="width: 52rem">
                <div class="card col-md-24">
                  <div class="card-body">
                    <div class="card-text vertical-alignment">
                      <label><strong>Name:</strong></label>
                      {{ inventory.name }} <br />
                      <label><strong>Description:</strong></label>
                      {{ inventory.description }} <br />
                      <label><strong>Created date:</strong></label>
                      {{ inventory.createdDate }} <br />
                      <div v-if="inventory.zones != null">
                        <ag-grid-vue
                          style="width: 202px; height: 200px"
                          class="ag-theme-alpine"
                          rowSelection="single"
                          :gridOptions="zoneGridOptions"
                          :columnDefs="columnZoneDefs"
                          :rowData="inventory.zones"
                          @cell-clicked="onZoneCellClicked"
                        >
                        </ag-grid-vue>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      currentInventoryId: null,
      isDisplayModal: false,
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
    updateZone() {
      console.log("currentZone", this.currentZone);
      ZoneDataService.updateZone(
        this.currentZone.publicId,
        this.currentZone
      ).then((response) => {
        if (response.status === 200) {
          console.log("response.data", response.data);
         // this.currentZone = response.data;
          for (let inventory of this.inventories) {
            console.log(
              "###inventoryid",
              inventory.id,
              this.currentZone.inventoryId
            );
            if (inventory.id == this.currentZone.inventoryId) {
              console.log("OKKK");
              for (let zone of inventory.zones) {
                if (zone.id == this.currentZone.id) {
                  zone = this.currentZone;
                  
                }
              }
            }
          }
          //this.inventories.sort((a, b) => (a.name > b.name ? 1 : -1));
          console.log("newInventories", this.inventories);

          this.isDisplayModal = false;
          this.currentZone = null;
              this.retrieveInventories();

          this.$forceUpdate();
          
        }
      });
    },
    closeModal() {
      this.isDisplayModal = false;
      this.currentZone = null;
    },
    onInventoryCellClicked(e) {
      let selectedNodes = this.inventoryGridApi.getSelectedNodes();
      let selectedData = selectedNodes.map((node) => node.data)[0];
      this.setActiveInventory(selectedData, e.rowIndex);
    },
    onZoneCellClicked(e) {
      // this.zoneGridApi = this.zoneGridOptions.api;
      // let selectedNodes = this.zoneGridApi.getSelectedNodes();
      this.currentZone = e.data;
      console.log("currentZone", this.currentZone, e);
      this.isDisplayModal = true;
      this.$forceUpdate();
    },
    retrieveInventories() {
      console.log("[retrieveInventories...]");
      InventoryDataService.getAll()
        .then((response) => {
          this.inventories = response.data;
          console.log("inventories", this.inventories);
          for (const inventory of this.inventories) {
            console.log(inventory.name);
            ZoneDataService.getZonesByInventoryId(inventory.id)
              .then((response) => {
                console.log("zones", response);
                inventory.zones = response.data;
                this.$forceUpdate();
              })
              .catch((e) => {
                console.log("step 2: ", e);
                //TODO: ERROR popup
              });
          }
          this.$forceUpdate();
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
    deleteZone(zoneId) {
      ZoneDataService.deleteZone(zoneId)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            let currentInventory = this.inventories.find((obj) => {
              return obj.id === this.currentZone.inventoryId;
            });
            currentInventory.zones = currentInventory.zones.filter(function (
              obj
            ) {
              return obj.id !== zoneId;
            });
            let newInventories = this.inventories.filter((obj) => {
              return obj.id !== this.currentZone.inventoryId;
            });
            newInventories.push(currentInventory);
            newInventories.sort((a, b) => (a.name > b.name ? 1 : -1));

            this.inventories = newInventories;
            console.log("inventories", this.inventories);
            this.currentZone = null;
            this.isDisplayModal = false;
             this.retrieveInventories();
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
      this.currentInventoryId = null;
      this.currentInventory = null;
      this.currentZone = null;
      this.currentIndex = -1;
      this.isDisplayModal = false;
    },
  },
  beforeMount() {
    this.inventoryGridOptions = {};
    this.zoneGridOptions = {};
    this.columnInventoryDefs = [
      {
        headerName: "Name",
        field: "name",
        filter: true,
      },
    ];
    this.columnZoneDefs = [
      {
        headerName: "Zone",
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
.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
  margin-left: auto;
  margin-right: auto;
}
</style>