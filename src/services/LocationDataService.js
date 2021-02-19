import http from "../http-common"

class LocationDataService {
    getAll() {
        return http.get("/locations");
    }

    deleteInventory(id) {
        return http.delete("/inventories/" + id);
    }

    createLocation(location) {
        return http.post("/locations", JSON.stringify(location));
    }
}

export default new LocationDataService();