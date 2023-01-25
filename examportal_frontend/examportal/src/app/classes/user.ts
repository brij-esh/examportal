export class User {
    username!:string;
    password!:string;
    firstName!:string;
    lastName!:string;
    email!:string;
    phone!:string;
    authorities!:authorities[];
    enabled!:boolean;
    profile!:string;
}

interface authorities{
    authority:string;
}
