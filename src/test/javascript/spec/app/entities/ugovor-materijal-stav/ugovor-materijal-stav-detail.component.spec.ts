/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RasvetaTestModule } from '../../../test.module';
import { UgovorMaterijalStavDetailComponent } from '../../../../../../main/webapp/app/entities/ugovor-materijal-stav/ugovor-materijal-stav-detail.component';
import { UgovorMaterijalStavService } from '../../../../../../main/webapp/app/entities/ugovor-materijal-stav/ugovor-materijal-stav.service';
import { UgovorMaterijalStav } from '../../../../../../main/webapp/app/entities/ugovor-materijal-stav/ugovor-materijal-stav.model';

describe('Component Tests', () => {

    describe('UgovorMaterijalStav Management Detail Component', () => {
        let comp: UgovorMaterijalStavDetailComponent;
        let fixture: ComponentFixture<UgovorMaterijalStavDetailComponent>;
        let service: UgovorMaterijalStavService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [UgovorMaterijalStavDetailComponent],
                providers: [
                    UgovorMaterijalStavService
                ]
            })
            .overrideTemplate(UgovorMaterijalStavDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UgovorMaterijalStavDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UgovorMaterijalStavService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UgovorMaterijalStav(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ugovorMaterijalStav).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
