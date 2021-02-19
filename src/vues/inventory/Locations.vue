<template>
  <div class="list row">
    <!-- Creating Location Dialog -->
    <div v-if="isCreatingLocation"
         class="modal centered"
         tabindex="-1"
         role="dialog"
         style="display: block">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Creating location...</h5>
            <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                v-on:click="closeCreatingLocationDialog">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div style="text-align: left">
              <b-form id="createLocationDialog" @submit="confirmCreatingLocation" @reset="onReset" v-if="show">
                <b-form-group id="input-group-1"
                              description="Please insert a Location name (1-50 characters).">
                  <b-form-input inline id="input-1"
                                v-model="form.name"
                                placeholder="Insert name"
                                required></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-2">
                  <b-form-textarea inline id="input-2"
                                   v-model="form.description"
                                   placeholder="Insert description"
                                   style="height: 100px"></b-form-textarea>
                </b-form-group>

                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
              </b-form>
            </div>

          </div>
        </div>
      </div>
    </div>
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
import {CREATE_LOCATION, FETCH_LOCATIONS} from "@/store/actions.type";
import {AgGridVue} from "ag-grid-vue";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {BButton, BForm, BFormGroup, BFormInput, BFormTextarea} from 'bootstrap-vue';

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
      form: {
        name: '',
        description: ''
      },
      show: true
    }
  },
  beforeMount() {
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
          return '<button type="button" @click="deleteLocation(currentLocation.id)"> Delete </button>'
        },
      },
    ];
  },
  computed: {
    locations() {
      return this.$store.state.locations.locations;
    }
  },
  methods: {
    searchByName() {
    },
    openCreateLocationDialog() {
      this.isCreatingLocation = true;
    },
    closeCreatingLocationDialog() {
      this.isCreatingLocation = false;
    },
    confirmCreatingLocation(event) {
      event.preventDefault();
      /* LocationDataService.createLocation(this.form)
           .then((response) => {
             console.log("created response:", response);
             this.isCreatingLocation = false;
           })
           .catch((e) => {
             console.log("step 2: ", e);
           });*/
      this.$store.dispatch(CREATE_LOCATION, this.form)
          .then(() => {
            this.isCreatingLocation = false;
          }).catch((e) => {
        //TODO: add popup
        console.log("step 2: ", e);
      });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.name = '';
      this.form.description = '';
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  components: {
    AgGridVue,
    BForm,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BButton
  }
}
</script>

<style>
.list {
  text-align: left;
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