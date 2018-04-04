/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RasvetaTestModule } from '../../../test.module';
import { UgovorMaterijalDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/ugovor-materijal/ugovor-materijal-delete-dialog.component';
import { UgovorMaterijalService } from '../../../../../../main/webapp/app/entities/ugovor-materijal/ugovor-materijal.service';

describe('Component Tests', () => {

    describe('UgovorMaterijal Management Delete Component', () => {
        let comp: UgovorMaterijalDeleteDialogComponent;
        let fixture: ComponentFixture<UgovorMaterijalDeleteDialogComponent>;
        let service: UgovorMaterijalService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [UgovorMaterijalDeleteDialogComponent],
                providers: [
                    UgovorMaterijalService
                ]
            })
            .overrideTemplate(UgovorMaterijalDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UgovorMaterijalDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UgovorMaterijalService);
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
