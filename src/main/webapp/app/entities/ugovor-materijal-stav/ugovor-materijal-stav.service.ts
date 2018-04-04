import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UgovorMaterijalStav } from './ugovor-materijal-stav.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UgovorMaterijalStav>;

@Injectable()
export class UgovorMaterijalStavService {

    private resourceUrl =  SERVER_API_URL + 'api/ugovor-materijal-stavs';

    constructor(private http: HttpClient) { }

    create(ugovorMaterijalStav: UgovorMaterijalStav): Observable<EntityResponseType> {
        const copy = this.convert(ugovorMaterijalStav);
        return this.http.post<UgovorMaterijalStav>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(ugovorMaterijalStav: UgovorMaterijalStav): Observable<EntityResponseType> {
        const copy = this.convert(ugovorMaterijalStav);
        return this.http.put<UgovorMaterijalStav>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UgovorMaterijalStav>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UgovorMaterijalStav[]>> {
        const options = createRequestOption(req);
        return this.http.get<UgovorMaterijalStav[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UgovorMaterijalStav[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UgovorMaterijalStav = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UgovorMaterijalStav[]>): HttpResponse<UgovorMaterijalStav[]> {
        const jsonResponse: UgovorMaterijalStav[] = res.body;
        const body: UgovorMaterijalStav[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UgovorMaterijalStav.
     */
    private convertItemFromServer(ugovorMaterijalStav: UgovorMaterijalStav): UgovorMaterijalStav {
        const copy: UgovorMaterijalStav = Object.assign({}, ugovorMaterijalStav);
        return copy;
    }

    /**
     * Convert a UgovorMaterijalStav to a JSON which can be sent to the server.
     */
    private convert(ugovorMaterijalStav: UgovorMaterijalStav): UgovorMaterijalStav {
        const copy: UgovorMaterijalStav = Object.assign({}, ugovorMaterijalStav);
        return copy;
    }
}
