import http from "../http-common"

class InventoryDataService {
    getAll() {
        return http.get("/inventories");
    }

    deleteInventory(id){
        return http.delete("/inventories/" +id);
    }
}

export default new InventoryDataService();