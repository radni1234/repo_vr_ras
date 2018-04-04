/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RasvetaTestModule } from '../../../test.module';
import { OpstinaComponent } from '../../../../../../main/webapp/app/entities/opstina/opstina.component';
import { OpstinaService } from '../../../../../../main/webapp/app/entities/opstina/opstina.service';
import { Opstina } from '../../../../../../main/webapp/app/entities/opstina/opstina.model';

describe('Component Tests', () => {

    describe('Opstina Management Component', () => {
        let comp: OpstinaComponent;
        let fixture: ComponentFixture<OpstinaComponent>;
        let service: OpstinaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [OpstinaComponent],
                providers: [
                    OpstinaService
                ]
            })
            .overrideTemplate(OpstinaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OpstinaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OpstinaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Opstina(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.opstinas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
