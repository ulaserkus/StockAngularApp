import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InfoComponent } from './info/info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardService } from 'src/services/guards/auth-guard.service';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientComponent } from './patient/patient.component';
import { HealthUnitComponent } from './health-unit/health-unit.component';
import { HomeComponent } from './admin/home/home.component';
import { HomeComponent as UnitHomeComponent } from './health-unit/home/home.component';
import { ProducerComponent } from './admin/producer/producer.component';
import { UnitComponent } from './admin/unit/unit.component';
import { ProductsComponent } from './admin/products/products.component';
import { UsersComponent } from './admin/users/users.component';
import { AdminAuthGuardService } from 'src/services/guards/admin-auth-guard.service';
import { HealthunitAuthGuardService } from 'src/services/guards/healthunit-auth-guard.service';
import { ReportsComponent } from './health-unit/reports/reports.component';
import { UnitdoctorsComponent } from './health-unit/unitdoctors/unitdoctors.component';
import { DoctorhomeComponent } from './doctor/doctorhome/doctorhome.component';
import { DoctorunitComponent } from './doctor/doctorunit/doctorunit.component';
import { DoctorpatientsComponent } from './doctor/doctorpatients/doctorpatients.component';
import { DoctorAuthGuardService } from 'src/services/guards/doctor-auth-guard.service';
import { PatientAuthGuardService } from 'src/services/guards/patient-auth-guard.service';
import { AlertifyService } from 'src/services/alertify.service';
import { PatienthomeComponent } from './patient/patienthome/patienthome.component';
import { PatientappointmentsComponent } from './patient/patientappointments/patientappointments.component';
import { UnitpatientsComponent } from './health-unit/unitpatients/unitpatients.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { ProducerpageComponent } from './producerpage/producerpage.component';
import { ProducerAuthGuardService } from 'src/services/guards/producer-auth-guard.service';
import { ProducerhomepageComponent } from './producerpage/producerhomepage/producerhomepage.component';
import { ProducerstockpageComponent } from './producerpage/producerstockpage/producerstockpage.component';
import { DatePipe } from '@angular/common';
import { PiechartComponent } from './info/piechart/piechart.component'
import{NgApexchartsModule} from 'ng-apexcharts';
import { PiechartstockComponent } from './info/piechartstock/piechartstock.component';
import { ProducerclaimComponent } from './producerpage/producerclaim/producerclaim.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



export function tokenGetter() {
  return localStorage.getItem("jwt")
}

const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter: tokenGetter,
    allowedDomains: ['localhost:5000'],
    disallowedRoutes: []
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InfoComponent,
    AdminComponent,
    DoctorComponent,
    PatientComponent,
    HealthUnitComponent,
    HomeComponent,
    ProducerComponent,
    UnitComponent,
    ProductsComponent,
    UsersComponent,
    UnitHomeComponent,
    ReportsComponent,
    UnitdoctorsComponent,
    DoctorhomeComponent,
    DoctorunitComponent,
    DoctorpatientsComponent,
    PatienthomeComponent,
    PatientappointmentsComponent,
    UnitpatientsComponent,
    ProducerpageComponent,
    ProducerhomepageComponent,
    ProducerstockpageComponent,
    PiechartComponent,
    PiechartstockComponent,
    ProducerclaimComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot(JWT_Module_Options),
    DlDateTimeDateModule,  
    DlDateTimePickerModule,
    NgApexchartsModule,
    NgbModule

  ],
  providers: [DatePipe,AlertifyService,ProducerAuthGuardService,AdminAuthGuardService,HealthunitAuthGuardService,DoctorAuthGuardService,PatientAuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
