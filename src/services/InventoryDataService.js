import http from "../http-common"

class LocationDataService {
    getAll() {
        return http.get("/locations");
    }

    deleteInventory(id) {
        return http.delete("/inventories/" + id);
    }

    createInventory(inventory) {
        return http.post("/inventories", JSON.stringify(inventory));
    }
}

export default new LocationDataService();