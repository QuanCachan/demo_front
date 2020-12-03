import http from "../http-common"

class InventoryDataService {
    getAll() {
        return http.get("/inventories");
    }
}

export default new InventoryDataService();