import { FormGroup } from '@angular/forms';

export abstract class IService<T> {

    abstract get(): Promise<T>;
    abstract set(obj: any): Promise<T>;

    populateForm(obj: T, formGroup: FormGroup) {
        for(let key of Object.keys(obj)) {
            formGroup.controls[key].setValue(obj[key]);
        }
    }
}