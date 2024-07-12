import http from "./config"

const auth =  {
    sign_in:(data)=> http.post("login",data),
    sign_up: (data)=> http.post("register",data),
    forgot_password: (data)=> http.post("forgot-password",data),
    verify:(data)=> http.post("verify",data), 
    verify_forgot_password: (data)=> http.post("verify-forgot-password",data)
}

export default auth;    