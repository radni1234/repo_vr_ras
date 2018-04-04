import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JedMere } from './jed-mere.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<JedMere>;

@Injectable()
export class JedMereService {

    private resourceUrl =  SERVER_API_URL + 'api/jed-meres';

    constructor(private http: HttpClient) { }

    create(jedMere: JedMere): Observable<EntityResponseType> {
        const copy = this.convert(jedMere);
        return this.http.post<JedMere>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(jedMere: JedMere): Observable<EntityResponseType> {
        const copy = this.convert(jedMere);
        return this.http.put<JedMere>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<JedMere>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<JedMere[]>> {
        const options = createRequestOption(req);
        return this.http.get<JedMere[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<JedMere[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: JedMere = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<JedMere[]>): HttpResponse<JedMere[]> {
        const jsonResponse: JedMere[] = res.body;
        const body: JedMere[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to JedMere.
     */
    private convertItemFromServer(jedMere: JedMere): JedMere {
        const copy: JedMere = Object.assign({}, jedMere);
        return copy;
    }

    /**
     * Convert a JedMere to a JSON which can be sent to the server.
     */
    private convert(jedMere: JedMere): JedMere {
        const copy: JedMere = Object.assign({}, jedMere);
        return copy;
    }
}
