import http from './config'

const product = {
    create: (data)=> http.post("/product",data),
    get: (id)=> http.get(`/product/${id}`),
    delete: (id)=> http.delete(`/product/${id}`),
    update: (data)=> http.put("/product", data)
}
export default product;


