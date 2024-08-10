export interface User {
    userName:string,
    email:string,
    password:string,
    confirmPassword:string,
    role:string,
    location?:string,
    pinCode?:string,
    district?:string,
    state?:string
}
