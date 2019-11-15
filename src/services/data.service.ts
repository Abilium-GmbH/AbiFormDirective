import { Injectable } from '@angular/core';
import { IService } from './iservice';
import { StoreObject } from 'src/models/store.object';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators'; 

const KEY = "KEY";

/**
 * Sample service that "retrieves" and "stores" an object from a server
 */
@Injectable()
export class DataService extends IService<StoreObject> {

    storeObject: StoreObject; // the object of the form

    constructor() {
        super();
        this.storeObject = JSON.parse(localStorage.getItem(KEY)); // simulate server storage
    }

    get(): Promise<StoreObject> {
        this.storeObject = JSON.parse(localStorage.getItem(KEY)); // simulate server storage
        return of(Object.assign({},this.storeObject)).pipe(delay(200)).toPromise();
    }

    set(obj: StoreObject): Promise<StoreObject> {
        this.storeObject = Object.assign({}, obj);
        localStorage.setItem(KEY, JSON.stringify(this.storeObject)); // simulate server storage
        return of(null).pipe(delay(200)).toPromise();
    }
}