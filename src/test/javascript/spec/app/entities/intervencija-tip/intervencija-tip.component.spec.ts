/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RasvetaTestModule } from '../../../test.module';
import { IntervencijaTipComponent } from '../../../../../../main/webapp/app/entities/intervencija-tip/intervencija-tip.component';
import { IntervencijaTipService } from '../../../../../../main/webapp/app/entities/intervencija-tip/intervencija-tip.service';
import { IntervencijaTip } from '../../../../../../main/webapp/app/entities/intervencija-tip/intervencija-tip.model';

describe('Component Tests', () => {

    describe('IntervencijaTip Management Component', () => {
        let comp: IntervencijaTipComponent;
        let fixture: ComponentFixture<IntervencijaTipComponent>;
        let service: IntervencijaTipService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [IntervencijaTipComponent],
                providers: [
                    IntervencijaTipService
                ]
            })
            .overrideTemplate(IntervencijaTipComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IntervencijaTipComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IntervencijaTipService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new IntervencijaTip(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.intervencijaTips[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
