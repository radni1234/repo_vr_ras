import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Opstina } from './opstina.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Opstina>;

@Injectable()
export class OpstinaService {

    private resourceUrl =  SERVER_API_URL + 'api/opstinas';

    constructor(private http: HttpClient) { }

    create(opstina: Opstina): Observable<EntityResponseType> {
        const copy = this.convert(opstina);
        return this.http.post<Opstina>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(opstina: Opstina): Observable<EntityResponseType> {
        const copy = this.convert(opstina);
        return this.http.put<Opstina>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Opstina>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Opstina[]>> {
        const options = createRequestOption(req);
        return this.http.get<Opstina[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Opstina[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Opstina = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Opstina[]>): HttpResponse<Opstina[]> {
        const jsonResponse: Opstina[] = res.body;
        const body: Opstina[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Opstina.
     */
    private convertItemFromServer(opstina: Opstina): Opstina {
        const copy: Opstina = Object.assign({}, opstina);
        return copy;
    }

    /**
     * Convert a Opstina to a JSON which can be sent to the server.
     */
    private convert(opstina: Opstina): Opstina {
        const copy: Opstina = Object.assign({}, opstina);
        return copy;
    }
}
