<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search location by name/Id"
               v-model="locationName"/>

        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
                  @click="searchByName">
            Search
          </button>
        </div>
      </div>

      <div class="mb-3">
        <button @click="openCreateLocationDialog" class="btn btn-success" type="button">Add Location</button>
      </div>
    </div>

    <div class="col-md-6">
      <h4>Location List</h4>
      <ag-grid-vue :grid-options="gridOptions"
                   style="width: 800px; height: 600px;"
                   class="ag-theme-alpine"
                   :columnDefs="columnDefs"
                   :rowData="locations">
      </ag-grid-vue>

    </div>
  </div>
</template>

<script>
import {FETCH_LOCATIONS} from "@/store/actions.type";
import {AgGridVue} from "ag-grid-vue";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export default {
  name: "locations",
  data() {
    return {
      locationName: "",
      isCreatingLocation: false,
      gridOptions: {
        debug: false,
        defaultColDef: {
          resizable: true
        },
      },
      columnDefs: null,
    }
  },
  beforeMount () {
    this.$store.dispatch(FETCH_LOCATIONS);
    this.columnDefs = [
      {
        headerName: "Id",
        field: "publicId",
        filter: true,
        width: 100,
        suppressSizeToFit: true
      },
      {
        field: "name",
        filter: true,
        width: 150,
        minWidth: 100,
        maxWidth: 300,
      },
      {
        field: "createdDate",
        filter: true,
        width: 250,
        minWidth: 200,
        maxWidth: 300,
      },
      {
        headerName: "Description",
        field: "description",
        filter: true,
        width: 200,
        minWidth: 100,
        maxWidth: 300,
      },
      {
        headerName: "Delete",
        width: 100,
        cellRenderer: function () {
          return '<button type="button" @click="deleteInventory(currentInventory.id)"> Delete </button>'
        },
      },
    ];
  },
  computed: {
    locations () {
      return this.$store.state.locations.locations;
    }
  },
  methods: {
    searchByName() {
    },
    openCreateLocationDialog() {
      this.isCreatingLocation = true;
    },
  },
  components: {
    AgGridVue,
  }
}
</script>

<style>
.list {
  text-align: left;
  margin: auto;
}
</style>