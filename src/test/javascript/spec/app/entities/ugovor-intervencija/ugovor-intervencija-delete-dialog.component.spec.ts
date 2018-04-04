/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RasvetaTestModule } from '../../../test.module';
import { UgovorIntervencijaDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/ugovor-intervencija/ugovor-intervencija-delete-dialog.component';
import { UgovorIntervencijaService } from '../../../../../../main/webapp/app/entities/ugovor-intervencija/ugovor-intervencija.service';

describe('Component Tests', () => {

    describe('UgovorIntervencija Management Delete Component', () => {
        let comp: UgovorIntervencijaDeleteDialogComponent;
        let fixture: ComponentFixture<UgovorIntervencijaDeleteDialogComponent>;
        let service: UgovorIntervencijaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [UgovorIntervencijaDeleteDialogComponent],
                providers: [
                    UgovorIntervencijaService
                ]
            })
            .overrideTemplate(UgovorIntervencijaDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UgovorIntervencijaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UgovorIntervencijaService);
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
