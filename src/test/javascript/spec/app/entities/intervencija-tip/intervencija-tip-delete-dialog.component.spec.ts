/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RasvetaTestModule } from '../../../test.module';
import { IntervencijaTipDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/intervencija-tip/intervencija-tip-delete-dialog.component';
import { IntervencijaTipService } from '../../../../../../main/webapp/app/entities/intervencija-tip/intervencija-tip.service';

describe('Component Tests', () => {

    describe('IntervencijaTip Management Delete Component', () => {
        let comp: IntervencijaTipDeleteDialogComponent;
        let fixture: ComponentFixture<IntervencijaTipDeleteDialogComponent>;
        let service: IntervencijaTipService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [IntervencijaTipDeleteDialogComponent],
                providers: [
                    IntervencijaTipService
                ]
            })
            .overrideTemplate(IntervencijaTipDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IntervencijaTipDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IntervencijaTipService);
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
