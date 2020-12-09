import http from "../http-common"

class ZoneDataService {
    getAll() {
        return http.get("/zones");
    }

    getZonesByInventoryId(inventoryId) {
        return http.get("/zones?inventoryId=" +inventoryId);
    }

    deleteZone(id){
        return http.delete("/zones/" +id);
    }
}

export default new ZoneDataService();