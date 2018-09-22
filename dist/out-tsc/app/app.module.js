var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AppComponent } from './app.component';
import { NavbarComponent } from './componets/navbar/navbar.component';
import { LoginComponent } from './componets/login/login.component';
import { RegisterComponent } from './componets/register/register.component';
import { HomeComponent } from './componets/home/home.component';
import { DashboardComponent } from './componets/dashboard/dashboard.component';
import { ProfileComponent } from './componets/profile/profile.component';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { FooterComponent } from './componets/footer/footer.component';
import { SensorComponent } from './componets/sensor/sensor.component';
import { ProfileService } from './services/profile.service';
import { EcgService } from './services/ecg.service';
import { DatatransferService } from './services/datatransfer.service';
import { ConstantvariablesService } from './services/constantvariables.service';
import { EditProfileComponent } from './componets/edit-profile/edit-profile.component';
import { EditPasswordComponent } from './componets/edit-password/edit-password.component';
import { UnauthorizedPageComponent } from './componets/unauthorized-page/unauthorized-page.component';
import { PatientComponent } from './componets/patient/patient.component';
import { PatientService } from "./services/patient.service";
import { ModalComponent } from './componets/modal/modal.component';
import { ModalService } from "./services/modal.service";
import { UtilityService } from "./services/utility.service";
import { PatientDetailsComponent } from './componets/patient-details/patient-details.component';
import { PatientEditComponent } from './componets/patient-edit/patient-edit.component';
import { DoctorComponent } from './componets/doctor/doctor.component';
import { NurseComponent } from './componets/nurse/nurse.component';
import { ClinicComponent } from './componets/clinic/clinic.component';
import { EcgComponent } from './componets/ecg/ecg.component';
import { Interceptor } from './services/interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'; // it is already deprecated
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from "@angular/common/http"; // instead of HttpModule
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//import {TranslateModule, TranslateStaticLoader, TranslateLoader} from 'ng2-translate';
import { DoctorService } from "./services/doctor.service";
import { DoctorEditComponent } from './componets/doctor-edit/doctor-edit.component';
import { DoctorDetailsComponent } from './componets/doctor-details/doctor-details.component';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from "@toverux/ngx-sweetalert2";
import { NurseService } from "./services/nurse.service";
import { NurseDetailsComponent } from './componets/nurse-details/nurse-details.component';
import { NurseEditComponent } from './componets/nurse-edit/nurse-edit.component';
import { ClinicService } from "./services/clinic.service";
import { ClinicDetailsComponent } from './componets/clinic-details/clinic-details.component';
import { ClinicEditComponent } from './componets/clinic-edit/clinic-edit.component';
import { TransactionComponent } from './componets/transaction/transaction.component';
import { PatientAddComponent } from './componets/patient-add/patient-add.component';
//import { SidebarComponent } from './componets/sidebar/sidebar.component';
//import { MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
//import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
var appRoutes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'profileEdit', component: EditProfileComponent, canActivate: [AuthGuard] },
    { path: 'passwordEdit', component: EditPasswordComponent, canActivate: [AuthGuard] },
    {
        path: 'patientData', component: PatientComponent, canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_CLINIC', 'ROLE_DOCTOR', 'ROLE_NURSE'] }
    },
    {
        path: 'patientDetails', component: PatientDetailsComponent, canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_CLINIC', 'ROLE_DOCTOR', 'ROLE_NURSE'] }
    },
    {
        path: 'patientEdit', component: PatientEditComponent, canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_CLINIC', 'ROLE_DOCTOR', 'ROLE_NURSE'] }
    },
    {
        path: 'patientAdd', component: PatientAddComponent, canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_CLINIC', 'ROLE_DOCTOR', 'ROLE_NURSE'] }
    },
    {
        path: 'doctorData', component: DoctorComponent, canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_CLINIC'] }
    },
    {
        path: 'doctorDetails', component: DoctorDetailsComponent, canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_CLINIC', 'ROLE_DOCTOR', 'ROLE_NURSE'] }
    },
    {
        path: 'doctorEdit', component: DoctorEditComponent, canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_CLINIC', 'ROLE_DOCTOR', 'ROLE_NURSE'] }
    },
    {
        path: 'nurseData', component: NurseComponent, canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_CLINIC'] }
    },
    {
        path: 'nurseDetails', component: NurseDetailsComponent, canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_CLINIC', 'ROLE_DOCTOR', 'ROLE_NURSE'] }
    },
    {
        path: 'nurseEdit', component: NurseEditComponent, canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_CLINIC', 'ROLE_DOCTOR', 'ROLE_NURSE'] }
    },
    {
        path: 'clinicData', component: ClinicComponent, canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
    },
    {
        path: 'clinicDetails', component: ClinicDetailsComponent, canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
    },
    {
        path: 'clinicEdit', component: ClinicEditComponent, canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
    },
    {
        path: 'ecgData', component: EcgComponent, canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_CLINIC', 'ROLE_DOCTOR', 'ROLE_NURSE', 'ROLE_PATIENT'] }
    },
    {
        path: 'transaction', component: TransactionComponent, canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_CLINIC', 'ROLE_NURSE'] }
    },
    { path: 'unauthorized', component: UnauthorizedPageComponent, canActivate: [AuthGuard] }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            NavbarComponent,
            LoginComponent,
            RegisterComponent,
            HomeComponent,
            DashboardComponent,
            ProfileComponent,
            FooterComponent,
            SensorComponent,
            EditProfileComponent,
            EditPasswordComponent,
            UnauthorizedPageComponent,
            PatientComponent,
            ModalComponent,
            PatientDetailsComponent,
            PatientEditComponent,
            DoctorComponent,
            NurseComponent,
            ClinicComponent,
            EcgComponent,
            DoctorEditComponent,
            DoctorDetailsComponent,
            NurseDetailsComponent,
            NurseEditComponent,
            ClinicDetailsComponent,
            ClinicEditComponent,
            TransactionComponent,
            PatientAddComponent
            //SidebarComponent
        ],
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            //HttpClient,
            HttpClientModule,
            RouterModule.forRoot(appRoutes),
            FlashMessagesModule,
            NgxSpinnerModule,
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    //useFactory: TranslateHttpLoader,
                    useFactory: createTranslateLoader,
                    deps: [HttpClient]
                }
            }),
            /*
            TranslateModule.forRoot({
              provide: TranslateLoader,
              useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
              deps: [Http]
            }),
            */
            //TranslateModuleConfig,
            SweetAlert2Module.forRoot(),
        ],
        providers: [ValidateService, AuthService, AuthGuard, ProfileService,
            DatatransferService, ConstantvariablesService,
            PatientService, ModalService, UtilityService, EcgService, DoctorService, NurseService, ClinicService,
            { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
export function createTranslateLoader(http) {
    //return new TranslateHttpLoader(http, './assets/i18n/', '.json');
    return new TranslateHttpLoader(http);
}
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/app.module.js.map