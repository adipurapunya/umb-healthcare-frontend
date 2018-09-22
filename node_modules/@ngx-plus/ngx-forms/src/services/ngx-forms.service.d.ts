import { NgxFormFields } from '../components/ngx-form.interfaces';
export declare class NgxFormsService {
    parseFields(fields: NgxFormFields): any[];
    field(type?: string, templateType?: string, key?: string, options?: any): {
        key: string;
        type: string;
        templateOptions: {
            type: string;
        };
        className: any;
    };
    /**
     * @param {string} key
     * @param options
     * @return {{key: string; type: any; templateOptions: {type: any}; className: string}}
     */
    input(key?: string, options?: any): {
        key: string;
        type: string;
        templateOptions: {
            type: string;
        };
        className: any;
    };
    email(key?: string, options?: any): {
        key: string;
        type: string;
        templateOptions: {
            type: string;
        };
        className: any;
    };
    password(key?: string, options?: any): {
        key: string;
        type: string;
        templateOptions: {
            type: string;
        };
        className: any;
    };
    date(key?: string, options?: any): {
        key: string;
        type: string;
        templateOptions: {
            type: string;
        };
        className: any;
    };
    textarea(key?: string, options?: any): {
        key: string;
        type: string;
        templateOptions: {
            type: string;
        };
        className: any;
    };
    wysiwyg(key?: string, options?: any): {
        key: string;
        type: string;
        templateOptions: {
            type: string;
        };
        className: any;
    };
    select(key?: string, options?: any): {
        key: string;
        type: string;
        templateOptions: {
            type: string;
        };
        className: any;
    };
}
