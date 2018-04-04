/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RasvetaTestModule } from '../../../test.module';
import { UgovorMaterijalStavComponent } from '../../../../../../main/webapp/app/entities/ugovor-materijal-stav/ugovor-materijal-stav.component';
import { UgovorMaterijalStavService } from '../../../../../../main/webapp/app/entities/ugovor-materijal-stav/ugovor-materijal-stav.service';
import { UgovorMaterijalStav } from '../../../../../../main/webapp/app/entities/ugovor-materijal-stav/ugovor-materijal-stav.model';

describe('Component Tests', () => {

    describe('UgovorMaterijalStav Management Component', () => {
        let comp: UgovorMaterijalStavComponent;
        let fixture: ComponentFixture<UgovorMaterijalStavComponent>;
        let service: UgovorMaterijalStavService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [UgovorMaterijalStavComponent],
                providers: [
                    UgovorMaterijalStavService
                ]
            })
            .overrideTemplate(UgovorMaterijalStavComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UgovorMaterijalStavComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UgovorMaterijalStavService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UgovorMaterijalStav(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ugovorMaterijalStavs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
