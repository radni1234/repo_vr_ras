/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RasvetaTestModule } from '../../../test.module';
import { MaterijalTipComponent } from '../../../../../../main/webapp/app/entities/materijal-tip/materijal-tip.component';
import { MaterijalTipService } from '../../../../../../main/webapp/app/entities/materijal-tip/materijal-tip.service';
import { MaterijalTip } from '../../../../../../main/webapp/app/entities/materijal-tip/materijal-tip.model';

describe('Component Tests', () => {

    describe('MaterijalTip Management Component', () => {
        let comp: MaterijalTipComponent;
        let fixture: ComponentFixture<MaterijalTipComponent>;
        let service: MaterijalTipService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [MaterijalTipComponent],
                providers: [
                    MaterijalTipService
                ]
            })
            .overrideTemplate(MaterijalTipComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MaterijalTipComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaterijalTipService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MaterijalTip(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.materijalTips[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
