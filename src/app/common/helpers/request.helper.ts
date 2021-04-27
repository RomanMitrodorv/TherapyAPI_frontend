import { HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestOptions } from '../models';

export class RequestHelper {
    static constructRequestOptions(options?: RequestOptions): RequestOptions {

        if (!options) {
            options = {};
        }

        if (!options.headers) {
            options.headers = new HttpHeaders();
        }

        return options;
    }

    static buildQuery(params: any): HttpParams {
        console.log(params);
        const res = new HttpParams();
        
        for(let param in params) {
            res.append(param, params[param]);
        }

        return res;
    }
}