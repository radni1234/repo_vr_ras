/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RasvetaTestModule } from '../../../test.module';
import { JedMereComponent } from '../../../../../../main/webapp/app/entities/jed-mere/jed-mere.component';
import { JedMereService } from '../../../../../../main/webapp/app/entities/jed-mere/jed-mere.service';
import { JedMere } from '../../../../../../main/webapp/app/entities/jed-mere/jed-mere.model';

describe('Component Tests', () => {

    describe('JedMere Management Component', () => {
        let comp: JedMereComponent;
        let fixture: ComponentFixture<JedMereComponent>;
        let service: JedMereService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [JedMereComponent],
                providers: [
                    JedMereService
                ]
            })
            .overrideTemplate(JedMereComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JedMereComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JedMereService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new JedMere(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.jedMeres[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
