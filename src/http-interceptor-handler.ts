import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

export function createInterceptorHandler(baseHandler: HttpHandler, interceptors: HttpInterceptor[]): HttpHandler {
    return interceptors.reduceRight((next, interceptor) => new HttpInterceptorHandler(next, interceptor), baseHandler);
}

export class HttpInterceptorHandler implements HttpHandler {

    constructor(private next: HttpHandler, private interceptor: HttpInterceptor) { }

    public handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
        return this.interceptor.intercept(request, this.next);
    }

}
