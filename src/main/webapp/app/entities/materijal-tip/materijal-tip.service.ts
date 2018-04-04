import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { MaterijalTip } from './materijal-tip.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MaterijalTip>;

@Injectable()
export class MaterijalTipService {

    private resourceUrl =  SERVER_API_URL + 'api/materijal-tips';

    constructor(private http: HttpClient) { }

    create(materijalTip: MaterijalTip): Observable<EntityResponseType> {
        const copy = this.convert(materijalTip);
        return this.http.post<MaterijalTip>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(materijalTip: MaterijalTip): Observable<EntityResponseType> {
        const copy = this.convert(materijalTip);
        return this.http.put<MaterijalTip>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MaterijalTip>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MaterijalTip[]>> {
        const options = createRequestOption(req);
        return this.http.get<MaterijalTip[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MaterijalTip[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MaterijalTip = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MaterijalTip[]>): HttpResponse<MaterijalTip[]> {
        const jsonResponse: MaterijalTip[] = res.body;
        const body: MaterijalTip[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MaterijalTip.
     */
    private convertItemFromServer(materijalTip: MaterijalTip): MaterijalTip {
        const copy: MaterijalTip = Object.assign({}, materijalTip);
        return copy;
    }

    /**
     * Convert a MaterijalTip to a JSON which can be sent to the server.
     */
    private convert(materijalTip: MaterijalTip): MaterijalTip {
        const copy: MaterijalTip = Object.assign({}, materijalTip);
        return copy;
    }
}
