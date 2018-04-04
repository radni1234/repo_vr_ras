/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RasvetaTestModule } from '../../../test.module';
import { SvetiljkaComponent } from '../../../../../../main/webapp/app/entities/svetiljka/svetiljka.component';
import { SvetiljkaService } from '../../../../../../main/webapp/app/entities/svetiljka/svetiljka.service';
import { Svetiljka } from '../../../../../../main/webapp/app/entities/svetiljka/svetiljka.model';

describe('Component Tests', () => {

    describe('Svetiljka Management Component', () => {
        let comp: SvetiljkaComponent;
        let fixture: ComponentFixture<SvetiljkaComponent>;
        let service: SvetiljkaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [SvetiljkaComponent],
                providers: [
                    SvetiljkaService
                ]
            })
            .overrideTemplate(SvetiljkaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SvetiljkaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SvetiljkaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Svetiljka(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.svetiljkas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
