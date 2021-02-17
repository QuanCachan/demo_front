import http from "../http-common"

class InventoryDataService {
    getAll() {
        return http.get("/inventories");
    }

    deleteInventory(id) {
        return http.delete("/inventories/" + id);
    }

    createInventory(inventory) {
        return http.post("/inventories", JSON.stringify(inventory));
    }
}

export default new InventoryDataService();