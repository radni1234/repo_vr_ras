/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RasvetaTestModule } from '../../../test.module';
import { PrijavaMaterijalDetailComponent } from '../../../../../../main/webapp/app/entities/prijava-materijal/prijava-materijal-detail.component';
import { PrijavaMaterijalService } from '../../../../../../main/webapp/app/entities/prijava-materijal/prijava-materijal.service';
import { PrijavaMaterijal } from '../../../../../../main/webapp/app/entities/prijava-materijal/prijava-materijal.model';

describe('Component Tests', () => {

    describe('PrijavaMaterijal Management Detail Component', () => {
        let comp: PrijavaMaterijalDetailComponent;
        let fixture: ComponentFixture<PrijavaMaterijalDetailComponent>;
        let service: PrijavaMaterijalService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [PrijavaMaterijalDetailComponent],
                providers: [
                    PrijavaMaterijalService
                ]
            })
            .overrideTemplate(PrijavaMaterijalDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrijavaMaterijalDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrijavaMaterijalService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PrijavaMaterijal(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.prijavaMaterijal).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
