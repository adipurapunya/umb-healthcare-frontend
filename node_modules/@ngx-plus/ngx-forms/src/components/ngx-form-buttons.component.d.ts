import { EventEmitter } from '@angular/core';
import { NgxFormButton } from './ngx-form.interfaces';
export declare class NgxFormButtonsComponent {
    buttons: NgxFormButton[];
    item: any;
    classNames: string;
    action: EventEmitter<any>;
    click(type: any, payload: any): void;
}
