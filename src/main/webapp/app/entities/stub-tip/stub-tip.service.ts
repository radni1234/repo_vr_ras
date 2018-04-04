import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { StubTip } from './stub-tip.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StubTip>;

@Injectable()
export class StubTipService {

    private resourceUrl =  SERVER_API_URL + 'api/stub-tips';

    constructor(private http: HttpClient) { }

    create(stubTip: StubTip): Observable<EntityResponseType> {
        const copy = this.convert(stubTip);
        return this.http.post<StubTip>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(stubTip: StubTip): Observable<EntityResponseType> {
        const copy = this.convert(stubTip);
        return this.http.put<StubTip>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<StubTip>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StubTip[]>> {
        const options = createRequestOption(req);
        return this.http.get<StubTip[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StubTip[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StubTip = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<StubTip[]>): HttpResponse<StubTip[]> {
        const jsonResponse: StubTip[] = res.body;
        const body: StubTip[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to StubTip.
     */
    private convertItemFromServer(stubTip: StubTip): StubTip {
        const copy: StubTip = Object.assign({}, stubTip);
        return copy;
    }

    /**
     * Convert a StubTip to a JSON which can be sent to the server.
     */
    private convert(stubTip: StubTip): StubTip {
        const copy: StubTip = Object.assign({}, stubTip);
        return copy;
    }
}
