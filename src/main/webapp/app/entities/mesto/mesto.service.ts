import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Mesto } from './mesto.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Mesto>;

@Injectable()
export class MestoService {

    private resourceUrl =  SERVER_API_URL + 'api/mestos';

    constructor(private http: HttpClient) { }

    create(mesto: Mesto): Observable<EntityResponseType> {
        const copy = this.convert(mesto);
        return this.http.post<Mesto>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(mesto: Mesto): Observable<EntityResponseType> {
        const copy = this.convert(mesto);
        return this.http.put<Mesto>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Mesto>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Mesto[]>> {
        const options = createRequestOption(req);
        return this.http.get<Mesto[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Mesto[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Mesto = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Mesto[]>): HttpResponse<Mesto[]> {
        const jsonResponse: Mesto[] = res.body;
        const body: Mesto[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Mesto.
     */
    private convertItemFromServer(mesto: Mesto): Mesto {
        const copy: Mesto = Object.assign({}, mesto);
        return copy;
    }

    /**
     * Convert a Mesto to a JSON which can be sent to the server.
     */
    private convert(mesto: Mesto): Mesto {
        const copy: Mesto = Object.assign({}, mesto);
        return copy;
    }
}
