/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RasvetaTestModule } from '../../../test.module';
import { UgovorMaterijalComponent } from '../../../../../../main/webapp/app/entities/ugovor-materijal/ugovor-materijal.component';
import { UgovorMaterijalService } from '../../../../../../main/webapp/app/entities/ugovor-materijal/ugovor-materijal.service';
import { UgovorMaterijal } from '../../../../../../main/webapp/app/entities/ugovor-materijal/ugovor-materijal.model';

describe('Component Tests', () => {

    describe('UgovorMaterijal Management Component', () => {
        let comp: UgovorMaterijalComponent;
        let fixture: ComponentFixture<UgovorMaterijalComponent>;
        let service: UgovorMaterijalService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [UgovorMaterijalComponent],
                providers: [
                    UgovorMaterijalService
                ]
            })
            .overrideTemplate(UgovorMaterijalComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UgovorMaterijalComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UgovorMaterijalService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UgovorMaterijal(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ugovorMaterijals[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
