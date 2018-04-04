/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RasvetaTestModule } from '../../../test.module';
import { PrijavaMaterijalComponent } from '../../../../../../main/webapp/app/entities/prijava-materijal/prijava-materijal.component';
import { PrijavaMaterijalService } from '../../../../../../main/webapp/app/entities/prijava-materijal/prijava-materijal.service';
import { PrijavaMaterijal } from '../../../../../../main/webapp/app/entities/prijava-materijal/prijava-materijal.model';

describe('Component Tests', () => {

    describe('PrijavaMaterijal Management Component', () => {
        let comp: PrijavaMaterijalComponent;
        let fixture: ComponentFixture<PrijavaMaterijalComponent>;
        let service: PrijavaMaterijalService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [PrijavaMaterijalComponent],
                providers: [
                    PrijavaMaterijalService
                ]
            })
            .overrideTemplate(PrijavaMaterijalComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrijavaMaterijalComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrijavaMaterijalService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PrijavaMaterijal(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.prijavaMaterijals[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
