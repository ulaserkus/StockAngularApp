import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuardService } from 'src/services/guards/admin-auth-guard.service';
import { AuthGuardService } from 'src/services/guards/auth-guard.service';
import { DoctorAuthGuardService } from 'src/services/guards/doctor-auth-guard.service';
import { HealthunitAuthGuardService } from 'src/services/guards/healthunit-auth-guard.service';
import { PatientAuthGuardService } from 'src/services/guards/patient-auth-guard.service';
import { ProducerAuthGuardService } from 'src/services/guards/producer-auth-guard.service';
import { AdminComponent } from './admin/admin.component';
import { ProducerComponent } from './admin/producer/producer.component';
import { DoctorComponent } from './doctor/doctor.component';
import { HealthUnitComponent } from './health-unit/health-unit.component';
import { InfoComponent } from './info/info.component';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { ProducerpageComponent } from './producerpage/producerpage.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "info", component: InfoComponent },
  { path: "admin", component: AdminComponent, canActivate: [AdminAuthGuardService] },
  { path: "doctor", component: DoctorComponent, canActivate: [DoctorAuthGuardService] },
  { path: "patient", component: PatientComponent, canActivate: [PatientAuthGuardService] },
  { path: "healthunit", component: HealthUnitComponent, canActivate: [HealthunitAuthGuardService] },
  { path: "producer", component:ProducerpageComponent,canActivate:[ProducerAuthGuardService] },
  { path: "**", redirectTo: "", pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
