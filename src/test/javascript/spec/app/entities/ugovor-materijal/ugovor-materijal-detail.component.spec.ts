/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RasvetaTestModule } from '../../../test.module';
import { UgovorMaterijalDetailComponent } from '../../../../../../main/webapp/app/entities/ugovor-materijal/ugovor-materijal-detail.component';
import { UgovorMaterijalService } from '../../../../../../main/webapp/app/entities/ugovor-materijal/ugovor-materijal.service';
import { UgovorMaterijal } from '../../../../../../main/webapp/app/entities/ugovor-materijal/ugovor-materijal.model';

describe('Component Tests', () => {

    describe('UgovorMaterijal Management Detail Component', () => {
        let comp: UgovorMaterijalDetailComponent;
        let fixture: ComponentFixture<UgovorMaterijalDetailComponent>;
        let service: UgovorMaterijalService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [UgovorMaterijalDetailComponent],
                providers: [
                    UgovorMaterijalService
                ]
            })
            .overrideTemplate(UgovorMaterijalDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UgovorMaterijalDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UgovorMaterijalService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UgovorMaterijal(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ugovorMaterijal).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
