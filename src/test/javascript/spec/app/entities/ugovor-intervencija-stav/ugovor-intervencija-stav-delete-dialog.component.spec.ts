/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RasvetaTestModule } from '../../../test.module';
import { UgovorIntervencijaStavDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/ugovor-intervencija-stav/ugovor-intervencija-stav-delete-dialog.component';
import { UgovorIntervencijaStavService } from '../../../../../../main/webapp/app/entities/ugovor-intervencija-stav/ugovor-intervencija-stav.service';

describe('Component Tests', () => {

    describe('UgovorIntervencijaStav Management Delete Component', () => {
        let comp: UgovorIntervencijaStavDeleteDialogComponent;
        let fixture: ComponentFixture<UgovorIntervencijaStavDeleteDialogComponent>;
        let service: UgovorIntervencijaStavService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [UgovorIntervencijaStavDeleteDialogComponent],
                providers: [
                    UgovorIntervencijaStavService
                ]
            })
            .overrideTemplate(UgovorIntervencijaStavDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UgovorIntervencijaStavDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UgovorIntervencijaStavService);
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
