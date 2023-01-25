import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

const TOKEN_HEADER = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private loginService:LoginService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //add the jwt token from localstorage in every request
        let authReq = req;
        const token = this.loginService.getTokenOnDemand();
        // console.log("interceptor");
        
        if(token!=null){
            authReq = authReq.clone({setHeaders:{Authorization:`Bearer ${token}`},
        });
        }
        return next.handle(authReq);
    }
}

export const authInterceptorProvider=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true,
    }
]