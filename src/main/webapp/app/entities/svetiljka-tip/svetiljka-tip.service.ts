import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SvetiljkaTip } from './svetiljka-tip.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SvetiljkaTip>;

@Injectable()
export class SvetiljkaTipService {

    private resourceUrl =  SERVER_API_URL + 'api/svetiljka-tips';

    constructor(private http: HttpClient) { }

    create(svetiljkaTip: SvetiljkaTip): Observable<EntityResponseType> {
        const copy = this.convert(svetiljkaTip);
        return this.http.post<SvetiljkaTip>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(svetiljkaTip: SvetiljkaTip): Observable<EntityResponseType> {
        const copy = this.convert(svetiljkaTip);
        return this.http.put<SvetiljkaTip>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SvetiljkaTip>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SvetiljkaTip[]>> {
        const options = createRequestOption(req);
        return this.http.get<SvetiljkaTip[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SvetiljkaTip[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SvetiljkaTip = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SvetiljkaTip[]>): HttpResponse<SvetiljkaTip[]> {
        const jsonResponse: SvetiljkaTip[] = res.body;
        const body: SvetiljkaTip[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SvetiljkaTip.
     */
    private convertItemFromServer(svetiljkaTip: SvetiljkaTip): SvetiljkaTip {
        const copy: SvetiljkaTip = Object.assign({}, svetiljkaTip);
        return copy;
    }

    /**
     * Convert a SvetiljkaTip to a JSON which can be sent to the server.
     */
    private convert(svetiljkaTip: SvetiljkaTip): SvetiljkaTip {
        const copy: SvetiljkaTip = Object.assign({}, svetiljkaTip);
        return copy;
    }
}
