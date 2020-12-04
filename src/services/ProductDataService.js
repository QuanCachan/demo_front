import http from "../http-common"

class ProductDataService {
    getAll() {
        return http.get("/products");
    }
}

export default new ProductDataService();