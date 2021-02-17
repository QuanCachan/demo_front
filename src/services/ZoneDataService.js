import http from "../http-common"

class ZoneDataService {
    getAll() {
        return http.get("/zones");
    }

    getZonesByInventoryId(inventoryId) {
        return http.get("/zones?inventoryId=" +inventoryId);
    }

    updateZone(publicId,zone){
        return http.post("/zones/" +publicId,zone);
    }

    deleteZone(id){
        // TODO: return http.delete(id);
        return http.delete("/zones/" +id);
    }
}

export default new ZoneDataService();