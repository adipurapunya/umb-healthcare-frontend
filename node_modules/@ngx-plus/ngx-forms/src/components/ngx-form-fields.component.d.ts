import { EventEmitter, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxFormsService } from '../services/ngx-forms.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NgxFormFields } from './ngx-form.interfaces';
export declare class NgxFormFieldsComponent implements OnChanges {
    private formsService;
    form: FormGroup;
    formlyFields: FormlyFieldConfig[];
    fields: NgxFormFields;
    item: any;
    action: EventEmitter<any>;
    constructor(formsService: NgxFormsService);
    ngOnChanges(change: any): void;
}
