/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RasvetaTestModule } from '../../../test.module';
import { PrijavaIntervencijaDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/prijava-intervencija/prijava-intervencija-delete-dialog.component';
import { PrijavaIntervencijaService } from '../../../../../../main/webapp/app/entities/prijava-intervencija/prijava-intervencija.service';

describe('Component Tests', () => {

    describe('PrijavaIntervencija Management Delete Component', () => {
        let comp: PrijavaIntervencijaDeleteDialogComponent;
        let fixture: ComponentFixture<PrijavaIntervencijaDeleteDialogComponent>;
        let service: PrijavaIntervencijaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [PrijavaIntervencijaDeleteDialogComponent],
                providers: [
                    PrijavaIntervencijaService
                ]
            })
            .overrideTemplate(PrijavaIntervencijaDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrijavaIntervencijaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrijavaIntervencijaService);
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
