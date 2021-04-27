import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '../models';
import { Observable } from 'rxjs';
import { RequestHelper, LocalStorageHelper } from '../helpers';

export abstract class BaseHttpService {
    protected apiUrl: string = environment.apiEndpoint;

    constructor(private http: HttpClient) {}

    protected get<T>(url: string, options?: RequestOptions): Observable<T> {
        options = this.buildBaseRequest(options);
        return this.http.get<T>(this.apiUrl + url, options);
    }

    protected getFileByUrl(url: string, options?: RequestOptions) {
        return this.http.get(url, { responseType: 'blob' });
    }

    protected post<T>(url: string, body: Object, options?: RequestOptions): Observable<T> {
        options = this.buildBaseRequest(options);
        return this.http.post<T>(this.apiUrl + url, body, options);
    }

    protected put<T>(url: string, body: Object, options?: RequestOptions): Observable<T> {
        options = this.buildBaseRequest(options);
        return this.http.put<T>(this.apiUrl + url, body, options);
    }

    protected patch<T>(url: string, body: Object, options?: RequestOptions): Observable<T> {
        options = this.buildBaseRequest(options);
        return this.http.patch<T>(this.apiUrl + url, body, options);
    }

    protected delete<T>(url: string, options?: RequestOptions): Observable<T> {
        options = this.buildBaseRequest(options);
        return this.http.delete<T>(this.apiUrl + url, options);
    }

    private buildBaseRequest(options?: RequestOptions): RequestOptions {
        if (!options) options = RequestHelper.constructRequestOptions();
        const token = LocalStorageHelper.getToken();
        
        if (token) {
            options.headers = {
                "Authorization": `Bearer ${token}`
            };
        }

        return options;
    }
}