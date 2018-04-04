/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RasvetaTestModule } from '../../../test.module';
import { JedMereDetailComponent } from '../../../../../../main/webapp/app/entities/jed-mere/jed-mere-detail.component';
import { JedMereService } from '../../../../../../main/webapp/app/entities/jed-mere/jed-mere.service';
import { JedMere } from '../../../../../../main/webapp/app/entities/jed-mere/jed-mere.model';

describe('Component Tests', () => {

    describe('JedMere Management Detail Component', () => {
        let comp: JedMereDetailComponent;
        let fixture: ComponentFixture<JedMereDetailComponent>;
        let service: JedMereService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [JedMereDetailComponent],
                providers: [
                    JedMereService
                ]
            })
            .overrideTemplate(JedMereDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JedMereDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JedMereService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new JedMere(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.jedMere).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
