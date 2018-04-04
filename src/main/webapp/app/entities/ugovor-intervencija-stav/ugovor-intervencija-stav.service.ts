import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UgovorIntervencijaStav } from './ugovor-intervencija-stav.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UgovorIntervencijaStav>;

@Injectable()
export class UgovorIntervencijaStavService {

    private resourceUrl =  SERVER_API_URL + 'api/ugovor-intervencija-stavs';

    constructor(private http: HttpClient) { }

    create(ugovorIntervencijaStav: UgovorIntervencijaStav): Observable<EntityResponseType> {
        const copy = this.convert(ugovorIntervencijaStav);
        return this.http.post<UgovorIntervencijaStav>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(ugovorIntervencijaStav: UgovorIntervencijaStav): Observable<EntityResponseType> {
        const copy = this.convert(ugovorIntervencijaStav);
        return this.http.put<UgovorIntervencijaStav>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UgovorIntervencijaStav>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UgovorIntervencijaStav[]>> {
        const options = createRequestOption(req);
        return this.http.get<UgovorIntervencijaStav[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UgovorIntervencijaStav[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UgovorIntervencijaStav = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UgovorIntervencijaStav[]>): HttpResponse<UgovorIntervencijaStav[]> {
        const jsonResponse: UgovorIntervencijaStav[] = res.body;
        const body: UgovorIntervencijaStav[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UgovorIntervencijaStav.
     */
    private convertItemFromServer(ugovorIntervencijaStav: UgovorIntervencijaStav): UgovorIntervencijaStav {
        const copy: UgovorIntervencijaStav = Object.assign({}, ugovorIntervencijaStav);
        return copy;
    }

    /**
     * Convert a UgovorIntervencijaStav to a JSON which can be sent to the server.
     */
    private convert(ugovorIntervencijaStav: UgovorIntervencijaStav): UgovorIntervencijaStav {
        const copy: UgovorIntervencijaStav = Object.assign({}, ugovorIntervencijaStav);
        return copy;
    }
}
