/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RasvetaTestModule } from '../../../test.module';
import { PrijavaMaterijalDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/prijava-materijal/prijava-materijal-delete-dialog.component';
import { PrijavaMaterijalService } from '../../../../../../main/webapp/app/entities/prijava-materijal/prijava-materijal.service';

describe('Component Tests', () => {

    describe('PrijavaMaterijal Management Delete Component', () => {
        let comp: PrijavaMaterijalDeleteDialogComponent;
        let fixture: ComponentFixture<PrijavaMaterijalDeleteDialogComponent>;
        let service: PrijavaMaterijalService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [PrijavaMaterijalDeleteDialogComponent],
                providers: [
                    PrijavaMaterijalService
                ]
            })
            .overrideTemplate(PrijavaMaterijalDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrijavaMaterijalDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrijavaMaterijalService);
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
