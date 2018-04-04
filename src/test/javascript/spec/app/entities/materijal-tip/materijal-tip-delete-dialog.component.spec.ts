/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RasvetaTestModule } from '../../../test.module';
import { MaterijalTipDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/materijal-tip/materijal-tip-delete-dialog.component';
import { MaterijalTipService } from '../../../../../../main/webapp/app/entities/materijal-tip/materijal-tip.service';

describe('Component Tests', () => {

    describe('MaterijalTip Management Delete Component', () => {
        let comp: MaterijalTipDeleteDialogComponent;
        let fixture: ComponentFixture<MaterijalTipDeleteDialogComponent>;
        let service: MaterijalTipService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [MaterijalTipDeleteDialogComponent],
                providers: [
                    MaterijalTipService
                ]
            })
            .overrideTemplate(MaterijalTipDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MaterijalTipDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaterijalTipService);
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
