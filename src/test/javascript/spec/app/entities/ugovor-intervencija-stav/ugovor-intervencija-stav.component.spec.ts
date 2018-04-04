/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RasvetaTestModule } from '../../../test.module';
import { UgovorIntervencijaStavComponent } from '../../../../../../main/webapp/app/entities/ugovor-intervencija-stav/ugovor-intervencija-stav.component';
import { UgovorIntervencijaStavService } from '../../../../../../main/webapp/app/entities/ugovor-intervencija-stav/ugovor-intervencija-stav.service';
import { UgovorIntervencijaStav } from '../../../../../../main/webapp/app/entities/ugovor-intervencija-stav/ugovor-intervencija-stav.model';

describe('Component Tests', () => {

    describe('UgovorIntervencijaStav Management Component', () => {
        let comp: UgovorIntervencijaStavComponent;
        let fixture: ComponentFixture<UgovorIntervencijaStavComponent>;
        let service: UgovorIntervencijaStavService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [UgovorIntervencijaStavComponent],
                providers: [
                    UgovorIntervencijaStavService
                ]
            })
            .overrideTemplate(UgovorIntervencijaStavComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UgovorIntervencijaStavComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UgovorIntervencijaStavService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UgovorIntervencijaStav(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ugovorIntervencijaStavs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
