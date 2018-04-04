/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RasvetaTestModule } from '../../../test.module';
import { UgovorMaterijalStavDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/ugovor-materijal-stav/ugovor-materijal-stav-delete-dialog.component';
import { UgovorMaterijalStavService } from '../../../../../../main/webapp/app/entities/ugovor-materijal-stav/ugovor-materijal-stav.service';

describe('Component Tests', () => {

    describe('UgovorMaterijalStav Management Delete Component', () => {
        let comp: UgovorMaterijalStavDeleteDialogComponent;
        let fixture: ComponentFixture<UgovorMaterijalStavDeleteDialogComponent>;
        let service: UgovorMaterijalStavService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [UgovorMaterijalStavDeleteDialogComponent],
                providers: [
                    UgovorMaterijalStavService
                ]
            })
            .overrideTemplate(UgovorMaterijalStavDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UgovorMaterijalStavDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UgovorMaterijalStavService);
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
