import http from './config'

const category = {
    create: (data)=> http.post("/category",data),
    get: ()=> http.get("/categories", {params: {limit:1000, page:1}}),
    delete: (id)=> http.delete(`/category/${id}`),
    update: (data)=> http.put("/category", data),
}
export default category;