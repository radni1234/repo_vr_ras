import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { IntervencijaTip } from './intervencija-tip.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<IntervencijaTip>;

@Injectable()
export class IntervencijaTipService {

    private resourceUrl =  SERVER_API_URL + 'api/intervencija-tips';

    constructor(private http: HttpClient) { }

    create(intervencijaTip: IntervencijaTip): Observable<EntityResponseType> {
        const copy = this.convert(intervencijaTip);
        return this.http.post<IntervencijaTip>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(intervencijaTip: IntervencijaTip): Observable<EntityResponseType> {
        const copy = this.convert(intervencijaTip);
        return this.http.put<IntervencijaTip>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IntervencijaTip>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<IntervencijaTip[]>> {
        const options = createRequestOption(req);
        return this.http.get<IntervencijaTip[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<IntervencijaTip[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IntervencijaTip = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<IntervencijaTip[]>): HttpResponse<IntervencijaTip[]> {
        const jsonResponse: IntervencijaTip[] = res.body;
        const body: IntervencijaTip[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to IntervencijaTip.
     */
    private convertItemFromServer(intervencijaTip: IntervencijaTip): IntervencijaTip {
        const copy: IntervencijaTip = Object.assign({}, intervencijaTip);
        return copy;
    }

    /**
     * Convert a IntervencijaTip to a JSON which can be sent to the server.
     */
    private convert(intervencijaTip: IntervencijaTip): IntervencijaTip {
        const copy: IntervencijaTip = Object.assign({}, intervencijaTip);
        return copy;
    }
}
