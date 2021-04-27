import { Component, Input, OnInit, ɵCompiler_compileModuleAndAllComponentsAsync__POST_R3__ } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment } from 'src/models/appointment';
import { Doctor } from 'src/models/doctor';
import { PatientTable } from 'src/models/patient_table';
import { AlertifyService } from 'src/services/alertify.service';
import { PatientService } from 'src/services/patient.service';

@Component({
  selector: 'patient-patientappointments',
  templateUrl: './patientappointments.component.html',
  styleUrls: ['./patientappointments.component.css']
})
export class PatientappointmentsComponent implements OnInit {
  @Input() data
  appointments: Appointment[]
  form: FormGroup
  selectedDate
  patient: PatientTable
  doctors: Doctor[]
  doctorId: number
  priority: number
  phaseState
  constructor(private alertify: AlertifyService, private patientService: PatientService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.patientService.getPatientInfoById(this.data.patientId).subscribe(ddt => {
      this.patient = ddt

      this.patientService.getDoctorsByMinistary(ddt.Ministary_Id).subscribe(data => {
        this.doctors = data
      })

      if (this.patient.HasCronicPatient && this.patient.Patient_Age >= 50) {
        this.priority = 1
      } else if (this.patient.HasCronicPatient && this.patient.Patient_Age >= 20) {
        this.priority = 2
      } else {
        this.priority = 3
      }
    })


    this.patientService.getPatientAppointments(this.data.patientId).subscribe(res => {
      this.appointments = res
      console.log(res)
    })

    this.patientService.getPhaseStateByPatientId(this.data.patientId).subscribe(res => {
      this.phaseState = res
      console.log(this.phaseState.length)
    })

  }

  getDoctorId(id) {
    console.log(id)
    this.doctorId = id

  }
  take() {


    if (this.phaseState.length > 0) {
      this.alertify.error('Hasta Aşı Randevusu Bulunmakta')
    }
    else if (this.phaseState.length == 0) {

      if (new Date(this.selectedDate) <= new Date(Date.now())) {
        this.alertify.error("Hatalı Tarih")
      }
      else if (this.patient.HasVaccinated == true) {
        this.alertify.error('Hasta Fazları Tamamladı')
      } else {

        const appObj = {
          "doctorid": this.doctorId,
          "patientid": this.data.patientId,
          "date": this.selectedDate,
          "priority": this.priority

        }



        this.patientService.createAppointment(appObj).subscribe(res => {
          if (res == 'OK') {

            this.patientService.getLastAppointment().subscribe(res => {
              const phaseObj = {
                "phase": 1,
                "doctorpatientid": res.Id
              }
              this.patientService.createPhaseState(phaseObj).subscribe(res => {
                if (res == 'OK') {
                  this.alertify.success('Randevu Alındı')

                  setTimeout(() => {
                    window.location.reload()
                  }, 1000);
                }
              })

            })
          }

        })
      }


    }



  }
}
