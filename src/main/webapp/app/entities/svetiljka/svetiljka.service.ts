import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Svetiljka } from './svetiljka.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Svetiljka>;

@Injectable()
export class SvetiljkaService {

    private resourceUrl =  SERVER_API_URL + 'api/svetiljkas';

    constructor(private http: HttpClient) { }

    create(svetiljka: Svetiljka): Observable<EntityResponseType> {
        const copy = this.convert(svetiljka);
        return this.http.post<Svetiljka>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(svetiljka: Svetiljka): Observable<EntityResponseType> {
        const copy = this.convert(svetiljka);
        return this.http.put<Svetiljka>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Svetiljka>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Svetiljka[]>> {
        const options = createRequestOption(req);
        return this.http.get<Svetiljka[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Svetiljka[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Svetiljka = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Svetiljka[]>): HttpResponse<Svetiljka[]> {
        const jsonResponse: Svetiljka[] = res.body;
        const body: Svetiljka[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Svetiljka.
     */
    private convertItemFromServer(svetiljka: Svetiljka): Svetiljka {
        const copy: Svetiljka = Object.assign({}, svetiljka);
        return copy;
    }

    /**
     * Convert a Svetiljka to a JSON which can be sent to the server.
     */
    private convert(svetiljka: Svetiljka): Svetiljka {
        const copy: Svetiljka = Object.assign({}, svetiljka);
        return copy;
    }
}
