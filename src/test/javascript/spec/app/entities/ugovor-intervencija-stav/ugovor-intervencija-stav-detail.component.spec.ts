/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RasvetaTestModule } from '../../../test.module';
import { UgovorIntervencijaStavDetailComponent } from '../../../../../../main/webapp/app/entities/ugovor-intervencija-stav/ugovor-intervencija-stav-detail.component';
import { UgovorIntervencijaStavService } from '../../../../../../main/webapp/app/entities/ugovor-intervencija-stav/ugovor-intervencija-stav.service';
import { UgovorIntervencijaStav } from '../../../../../../main/webapp/app/entities/ugovor-intervencija-stav/ugovor-intervencija-stav.model';

describe('Component Tests', () => {

    describe('UgovorIntervencijaStav Management Detail Component', () => {
        let comp: UgovorIntervencijaStavDetailComponent;
        let fixture: ComponentFixture<UgovorIntervencijaStavDetailComponent>;
        let service: UgovorIntervencijaStavService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [UgovorIntervencijaStavDetailComponent],
                providers: [
                    UgovorIntervencijaStavService
                ]
            })
            .overrideTemplate(UgovorIntervencijaStavDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UgovorIntervencijaStavDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UgovorIntervencijaStavService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UgovorIntervencijaStav(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ugovorIntervencijaStav).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
