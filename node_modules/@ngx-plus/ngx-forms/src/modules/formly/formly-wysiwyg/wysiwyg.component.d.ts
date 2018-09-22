import { OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
export declare class FormlyFieldWysiwygComponent extends FieldType implements OnInit {
    toolbars: {
        default: {
            toolbar: (string[] | {
                list: string;
            }[])[];
        };
        full: {
            toolbar: (string[] | {
                header: number;
            }[] | {
                list: string;
            }[] | {
                script: string;
            }[] | {
                indent: string;
            }[] | {
                direction: string;
            }[] | {
                size: (string | boolean)[];
            }[] | {
                header: (number | boolean)[];
            }[] | ({
                color: any[];
            } | {
                background: any[];
            })[] | {
                font: any[];
            }[] | {
                align: any[];
            }[])[];
        };
        basic: {
            toolbar: boolean;
        };
    };
    toolbar: {
        toolbar: boolean;
    };
    theme: string;
    ngOnInit(): void;
}
