/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RasvetaTestModule } from '../../../test.module';
import { PrijavaComponent } from '../../../../../../main/webapp/app/entities/prijava/prijava.component';
import { PrijavaService } from '../../../../../../main/webapp/app/entities/prijava/prijava.service';
import { Prijava } from '../../../../../../main/webapp/app/entities/prijava/prijava.model';

describe('Component Tests', () => {

    describe('Prijava Management Component', () => {
        let comp: PrijavaComponent;
        let fixture: ComponentFixture<PrijavaComponent>;
        let service: PrijavaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [PrijavaComponent],
                providers: [
                    PrijavaService
                ]
            })
            .overrideTemplate(PrijavaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrijavaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrijavaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Prijava(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.prijavas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
