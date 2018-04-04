/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RasvetaTestModule } from '../../../test.module';
import { UgovorIntervencijaDetailComponent } from '../../../../../../main/webapp/app/entities/ugovor-intervencija/ugovor-intervencija-detail.component';
import { UgovorIntervencijaService } from '../../../../../../main/webapp/app/entities/ugovor-intervencija/ugovor-intervencija.service';
import { UgovorIntervencija } from '../../../../../../main/webapp/app/entities/ugovor-intervencija/ugovor-intervencija.model';

describe('Component Tests', () => {

    describe('UgovorIntervencija Management Detail Component', () => {
        let comp: UgovorIntervencijaDetailComponent;
        let fixture: ComponentFixture<UgovorIntervencijaDetailComponent>;
        let service: UgovorIntervencijaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [UgovorIntervencijaDetailComponent],
                providers: [
                    UgovorIntervencijaService
                ]
            })
            .overrideTemplate(UgovorIntervencijaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UgovorIntervencijaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UgovorIntervencijaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UgovorIntervencija(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ugovorIntervencija).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
