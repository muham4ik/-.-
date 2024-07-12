import http from './config'

const product = {
    create: (data)=> http.post("/product",data),
    get: (params)=> http.get("/products?", {params}),
    delete: (id)=> http.delete(`/product/${id}`),
    update: (data)=> http.put("/product", data)
}
export default product;

