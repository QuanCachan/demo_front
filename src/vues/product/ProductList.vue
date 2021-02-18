<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by name"
               v-model="name"/>

        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
                  @click="searchName">
            Search
          </button>
        </div>
      </div>
      <div class="mb-3">
          <button @click="addProduct" class="btn btn-success" type="button">Add Product</button>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Product List</h4>
      <ag-grid-vue :grid-options="gridOptions"
                   style="width: 800px; height: 600px;"
                   class="ag-theme-alpine"
                   :columnDefs="columnDefs"
                   :rowData="products">
      </ag-grid-vue>
      <!--      <ul class="list-group">
              <li class="list-group-item"
                  :class="{ active: index === currentIndex }"
                  v-for="(product, index) in products"
                  :key="index"
                  @click="setActiveProduct(product, index)">
                {{ product.name }}
              </li>
            </ul>-->
    </div>
    <!--    <div class="col-md-6">
          <div v-if="currentProduct">
            <h4>Product</h4>
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
        </div>-->
  </div>

</template>
<script>
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {AgGridVue} from 'ag-grid-vue';
import "ag-grid-enterprise";
import ProductDataService from "@/services/ProductDataService";

export default {
  name: "product-list",
  data() {
    return {
      products: [],
      currentProduct: null,
      currentIndex: -1,
      name: "",
      columnDefs: null,
      gridOptions: {
        debug: false,
        defaultColDef: {
          enableValue: true,
          enableRowGroup: true,
          enablePivot: true,
          editable: false, // currently
          filterParams: {
            applyButton: false,
            clearButton: false,
            suppressAndOrCondition: true
          }
        },
        sideBar: {
          defaultToolPanel: "columns",
          toolPanels: [
            {
              id: "columns",
              labelDefault: "Columns",
              labelKey: "columns",
              iconKey: "columns",
              toolPanel: "agColumnsToolPanel"
            },
            {
              id: "filters",
              labelKey: "filters",
              labelDefault: "Filters",
              iconKey: "menu",
              toolPanel: "agFiltersToolPanel"
            }
          ]
        },
        rowModelType: "clientSide",
        suppressAggFuncInHeader: true,
        suppressPropertyNamesCheck: true,
        rowGroupPanelShow: "always",
        enableSorting: true,
        // showToolPanel: true,
        enableColResize: true,
        enableFilter: true,
        floatingFilter: true,
        enableRangeSelection: true,
        getContextMenuItems: this.getContextMenuItems,
        allowContextMenuWithControlKey: true
        //rowData: this.result.response.gridData
      }
    };
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
    searchName() {

    },
    setActiveProduct(product, index) {
      this.currentProduct = product;
      this.currentIndex = index;
    },
    addProduct() {
    }
  },
  beforeMount() {
    this.columnDefs = [
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