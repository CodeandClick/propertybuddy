export interface User {
    userName:string,
    email:string,
    password:string,
    confirmPassword:string,
    role:string,
    place?:string,
    pinCode?:string,
    district?:string,
    state?:string,
    phoneNumber?:string
}
