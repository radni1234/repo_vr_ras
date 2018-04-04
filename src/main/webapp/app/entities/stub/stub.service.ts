import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Stub } from './stub.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Stub>;

@Injectable()
export class StubService {

    private resourceUrl =  SERVER_API_URL + 'api/stubs';

    constructor(private http: HttpClient) { }

    create(stub: Stub): Observable<EntityResponseType> {
        const copy = this.convert(stub);
        return this.http.post<Stub>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(stub: Stub): Observable<EntityResponseType> {
        const copy = this.convert(stub);
        return this.http.put<Stub>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Stub>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Stub[]>> {
        const options = createRequestOption(req);

        return this.http.get<Stub[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Stub[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Stub = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Stub[]>): HttpResponse<Stub[]> {
        const jsonResponse: Stub[] = res.body;
        const body: Stub[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Stub.
     */
    private convertItemFromServer(stub: Stub): Stub {
        const copy: Stub = Object.assign({}, stub);
        return copy;
    }

    /**
     * Convert a Stub to a JSON which can be sent to the server.
     */
    private convert(stub: Stub): Stub {
        const copy: Stub = Object.assign({}, stub);
        return copy;
    }
}
