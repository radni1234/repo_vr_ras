/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RasvetaTestModule } from '../../../test.module';
import { SvetiljkaTipDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/svetiljka-tip/svetiljka-tip-delete-dialog.component';
import { SvetiljkaTipService } from '../../../../../../main/webapp/app/entities/svetiljka-tip/svetiljka-tip.service';

describe('Component Tests', () => {

    describe('SvetiljkaTip Management Delete Component', () => {
        let comp: SvetiljkaTipDeleteDialogComponent;
        let fixture: ComponentFixture<SvetiljkaTipDeleteDialogComponent>;
        let service: SvetiljkaTipService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [SvetiljkaTipDeleteDialogComponent],
                providers: [
                    SvetiljkaTipService
                ]
            })
            .overrideTemplate(SvetiljkaTipDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SvetiljkaTipDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SvetiljkaTipService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
