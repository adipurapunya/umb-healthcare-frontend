import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxFormConfig } from './ngx-form.interfaces';
export declare class NgxFormComponent {
    form: FormGroup;
    config: NgxFormConfig;
    item: {};
    action: EventEmitter<any>;
    handleAction($event: any): void;
}
