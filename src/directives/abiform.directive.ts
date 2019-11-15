import { Directive, AfterViewInit, ElementRef, Input, OnDestroy } from '@angular/core';
import { Observable, fromEvent, merge, Subscription } from 'rxjs';
import { IService } from '../services/iservice';

/**
 * Directive that enables autofetching and updating of object attributes on blur of a formGroup
 * Usage:
 * <form [formGroup]="objectFormGroup" [abiForm]="objectService">
 * ...
 * </form> 
 */

@Directive({
  selector:"[abiForm]"
})
export class AbiFormDirective implements AfterViewInit, OnDestroy { 

    @Input() abiForm: IService<any>; // serviceInstance that implements get() and set(val) methods
    @Input() formGroup; // the formGroup of the same host element of this directive

    previousFocus: any = null; // used to prevent multifetching when setting cursor

    subscriptions: Subscription = new Subscription(); // used for garbage collecting subscriptions

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit() {
        let inputs = this.el.nativeElement.getElementsByTagName('input'); // load input elements of this form
        let enterObs:Observable<any>[] = [];
        let leaveObs:Observable<any>[] = [];

        /*
        * install listeners for each input on click (enter) and blur (leave)
        */
        for(let input of inputs) {
            enterObs.push(fromEvent(input, 'click'));
            leaveObs.push(fromEvent(input, 'blur'));
        }
        let enter$ = merge(...enterObs).subscribe(val => {
            let selectionStart = val.target.selectionStart;
            let selectionEnd = val.target.selectionEnd;
            let attributeName = val.target.getAttribute('formControlName');
            if(this.previousFocus != val.target) { // had no focus before on this element
                val.target.parentElement.classList.remove("saved");
                this.abiForm.get().then(data => {
                    val.target.value = data[attributeName];
                    val.target.selectionStart = selectionStart;
                    val.target.selectionEnd = selectionEnd;
                });
                this.previousFocus = val.target;
            }
        });
        let leave$ = merge(...leaveObs).subscribe(val => {
            let attributeName = val.target.getAttribute('formControlName');
            this.abiForm.get().then(data => {
                if(val.target.value!=data[attributeName]) {
                    data[attributeName] = val.target.value;
                    this.abiForm.set(data).then(() => {
                        val.target.parentElement.classList.add("saved");
                        setTimeout(() => {
                            val.target.parentElement.classList.remove("saved");
                        }, 3000);
                    });
                }
            });
            this.previousFocus = null;
        });

        this.subscriptions.add(enter$);
        this.subscriptions.add(leave$);
    }

   ngOnDestroy() {
    this.subscriptions.unsubscribe();
   }
}