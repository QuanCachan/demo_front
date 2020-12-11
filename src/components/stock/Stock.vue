<template>
  <div class="list row">
    <div class="col-md-6">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by name or reference"
               v-model="searchInput"/>
      </div>
    </div>
    <div class="col-md-6">
      <div v-if="currentProduct">
        <h4>Stock</h4>
        <div>
          <label><strong>Name:</strong></label> {{ currentProduct.name }}
        </div>
        <div>
          <label><strong>Reference:</strong></label> {{ currentProduct.reference }}
        </div>
        <div>
          <label><strong>Physical State:</strong></label> {{ currentProduct.physicalState }}
        </div>
        <div>
          <label><strong>Unit:</strong></label> {{ currentProduct.unit }}
        </div>
        <div>
          <label><strong>Booked Quantity:</strong></label> {{ currentProduct.bookedQuantity }}
        </div>
        <div>
          <label><strong>Security Pictogram:</strong></label> {{ currentProduct.securityPictogramList }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentProduct.description }}
        </div>
        <div>
          <label><strong>Comment:</strong></label> {{ currentProduct.comment }}
        </div>
        <div>
          <label><strong>Attachment:</strong></label> {{ currentProduct.attachment }}
        </div>
      </div>
    </div>
    <div class="col-md-8">
      <h4>Stockage</h4>
      <ag-grid-vue :grid-options="gridOptions"
                   style="width: 800px; height: 600px;"
                   class="ag-theme-alpine"
                   :columnDefs="columnDefs"
                   :rowData="products"
                   @cell-clicked="onProductCellClicked">
      </ag-grid-vue>
    </div>
  </div>
</template>
<script>
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {AgGridVue} from 'ag-grid-vue';
import "ag-grid-enterprise";
import ProductDataService from "@/services/ProductDataService";


export default {
  name: "stock",
  data() {
    return {
      products: [],
      currentProduct: null,
      currentIndex: -1,
      searchInput: "",
      columnDefs: null,
      gridOptions: {
        debug: false,
        defaultColDef: {

        }
      }
    }
  },
  components: {
    AgGridVue
  },
  methods: {
    retrieveProducts() {
      ProductDataService.getAll()
          .then(response => {
            this.products = response.data;
          })
          .catch(e => {
            console.log("step 2: ", e);
            //TODO: ERROR popup
          });
    },
    setActiveProduct(product, index) {
      this.currentProduct = product;
      this.currentIndex = index;
    },
    onProductCellClicked(e) {
      let selectedNodes = this.inventoryGridApi.getSelectedNodes();
      let selectedData = selectedNodes.map((node) => node.data)[0];
      this.setActiveInventory(selectedData, e.rowIndex);
    },
  },
  beforeMount() {
    this.columnDefs = [
      {
        headerName: '#',
        field: 'id',
        filter: true
      },
      {
        headerName: 'Name',
        field: 'name',
        filter: true
      },
      {
        headerName: 'Reference',
        field: 'reference',
        filter: true
      },
      {
        headerName: 'Physical State',
        field: 'physicalState',
        filter: true
      },
      {
        headerName: 'Unit',
        field: 'unit',
        filter: true
      }
    ];
  },
  mounted() {
    this.retrieveProducts();
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