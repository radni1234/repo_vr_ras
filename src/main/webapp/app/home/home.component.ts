import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';
import {StubService} from '../entities/stub/stub.service';
import {Stub} from '../entities/stub/stub.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import {} from '@types/googlemaps';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    stubs: Stub[];

    title = 'Rasveta';

    // Zoom level
    zoom = 15;
    zoomCurrent;
    // Start Position

    lat = 45.5702;
    lng = 19.6450;
    lon_od = 0;
    lon_do = 0;
    lat_od = 0;
    lat_do = 0;

    searchControl: FormControl;

    @ViewChild('search')
    public searchElementRef: ElementRef;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private stubService: StubService,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();

        // this.stubService.query({size: 5000}).subscribe(
        //     (res: HttpResponse<Stub[]>) => {console.log(res.body); this.stubs = res.body; },
        //     (res: HttpErrorResponse) => console.log(res.message)
        // );

        // create search FormControl
        this.searchControl = new FormControl();

        // set current position
        // this.setCurrentPosition();

        // load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ['address']
            });
            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    // get the place result
                    const place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    console.log(place);

                    // verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    // set latitude, longitude and zoom
                    this.lat = place.geometry.location.lat();
                    this.lng = place.geometry.location.lng();
                    this.zoom = 15;
                });
            });
        });
    }

    mapClicked($event:  any) {
        console.log('Map Clicked');
        console.log($event);
    }

    boundsChanged($event:  any) {
        console.log('boundsChanged');
        console.log($event);

        if (this.zoomCurrent === 17
            && (Math.abs(this.lon_od - $event.b.b) > 0.002
                || Math.abs(this.lon_do - $event.b.f) > 0.002
                || Math.abs(this.lat_od - $event.f.b) > 0.002
                || Math.abs(this.lat_do - $event.f.f) > 0.002)) {
            this.stubService.vratiStubove($event.b.b, $event.b.f, $event.f.b, $event.f.f).subscribe(
                (res: Stub[]) => {console.log(res);
                                        this.stubs = res;
                                        this.lon_od = $event.b.b;
                                        this.lon_do = $event.b.f;
                                        this.lat_od = $event.f.b;
                                        this.lat_do = $event.f.f;
                }
            );
        }
    }

    zoomChanged($event:  any) {
        console.log('zoomChanged');
        console.log($event);
        this.zoomCurrent = $event;
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
