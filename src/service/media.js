import http from "./config";

const media = {
    upload: (data, id) => http.post(`/media/upload-photo?id=${id}`, data),
    get: (id) => http.get(`/media/${id}`),
    delete: (id) => http.delete(`/media/${id}`),
  };
  
  export default media;