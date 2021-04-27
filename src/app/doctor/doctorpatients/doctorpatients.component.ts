import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from 'src/models/appointment';
import { AppointmentPatient } from 'src/models/appointmentPatient';
import { Patient } from 'src/models/patient';
import { AlertifyService } from 'src/services/alertify.service';
import { DoctorService } from 'src/services/doctor.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'doctor-doctorpatients',
  templateUrl: './doctorpatients.component.html',
  styleUrls: ['./doctorpatients.component.css']
})
export class DoctorpatientsComponent implements OnInit {
  @Input() data

  appointmentPatientPhaseOne: AppointmentPatient[]
  appointmentPatientPhaseTwo: AppointmentPatient[]
  appointmentPatientPhaseExtra: AppointmentPatient[]

  constructor(public datepipe: DatePipe, private alertify: AlertifyService, private doctorService: DoctorService) { }

  ngOnInit(): void {

    this.doctorService.getPhaseOneAppointments(this.data.doctorId).subscribe(res => {
      this.appointmentPatientPhaseOne = res

    })

    this.doctorService.getPhaseTwoAppointments(this.data.doctorId).subscribe(res => {
      this.appointmentPatientPhaseTwo = res

    })

    this.doctorService.getPhaseExtraAppointments(this.data.doctorId).subscribe(res => {
      this.appointmentPatientPhaseExtra = res
    })



  }

  ngAfterViewInit() {
    setTimeout(() => {

      this.appointmentPatientPhaseTwo.forEach(x => {
        let date = new Date(x.Appointment_Date)
        let newDate = new Date(date.setDate(date.getDate() + 30))
        let latest_date = this.datepipe.transform(newDate, 'yyyy-MM-dd h:mm:ss');
        console.log(newDate)
        x.Appointment_Date = latest_date
      })


      this.appointmentPatientPhaseExtra.forEach(x => {
        let date = new Date(x.Appointment_Date)
        let newDate = new Date(date.setDate(date.getDate() + 60))
        let latest_date = this.datepipe.transform(newDate, 'yyyy-MM-dd h:mm:ss');
        console.log(newDate)
        x.Appointment_Date = latest_date
      })

    }, 100);

  }

  submitPhaseOne(patient) {
    if (new Date(patient.Appointment_Date) >= new Date(Date.now())) {

      let date = new Date(patient.Appointment_Date)
      let newDate = new Date(date.setDate(date.getDate() + 30))
      console.log(newDate)


      const appObj = {
        "doctorid": patient.Doctor_Id,
        "patientid": patient.Patient_Id,
        "date": newDate,
        "priority": patient.Priority

      }

      const phaseObj = {
        "phase": 2,
        "doctorpatientid": patient.Doctor_Patient_Id
      }

      this.doctorService.deletePhaseState(patient.Id).subscribe(res => {
        if (res == 'OK') {
          this.doctorService.createAppointment(appObj).subscribe(res => {
            if (res == 'OK') {
              this.doctorService.createPhaseState(phaseObj).subscribe(res => {
                if (res == 'OK') {
                  this.alertify.success("Faz 2'ye geçildi")
                  setTimeout(() => {
                    window.location.reload()
                  }, 1000);
                }
              })
            }
          })
        }
      })
      console.log(patient.Id)
      console.log(appObj)
      console.log(phaseObj)
    }
    else {
      this.alertify.error('Tarih Uygun Degil')
    }

  }

  submitPhaseTwo(patient) {
    console.log(patient.Appointment_Date)

    if (new Date(patient.Appointment_Date) >= new Date(Date.now())) {
      let date = new Date(patient.Appointment_Date)
      let newDate = new Date(date.setDate(date.getDate() + 30))
      console.log(newDate)


      const appObj = {
        "doctorid": patient.Doctor_Id,
        "patientid": patient.Patient_Id,
        "date": newDate,
        "priority": patient.Priority

      }

      const phaseObj = {
        "phase": 3,
        "doctorpatientid": patient.Doctor_Patient_Id
      }

      const patientObj = {
        "name": patient.Patient_FullName,
        "age": patient.Patient_Age,
        "phone": patient.Patient_Phone,
        "address": patient.Patient_Adress,
        "img": patient.Image_Url,
        "cronic": patient.HasCronicPatient,
        "vaccinated": true,
        "unitid": patient.Unit_Id
      }
      this.doctorService.updatePatient(patientObj, patient.Patient_Id).subscribe(res => {
        if (res == 'OK') {
          
          this.alertify.success("Hasta Fazları Tamamlandı")

        }
      }
      )

      this.doctorService.deletePhaseState(patient.Id).subscribe(res => {
        if (res == 'OK') {
          this.doctorService.createAppointment(appObj).subscribe(res => {
            if (res == 'OK') {
              this.doctorService.createPhaseState(phaseObj).subscribe(res => {
                if (res == 'OK') {
                  this.alertify.success("Ekstra'ya geçildi")
                  setTimeout(() => {
                    window.location.reload()
                  }, 1000);
                }
              })
            }
          })
        }
      })
      console.log(patient.Id)
      console.log(appObj)
      console.log(phaseObj)
    }
    else {
      this.alertify.error('Tarih Uygun Degil')
    }

  }

  submit(patient) {

    if (new Date(patient.Appointment_Date) >= new Date(Date.now())) {

      const patientObj = {
        "name": patient.Patient_FullName,
        "age": patient.Patient_Age,
        "phone": patient.Patient_Phone,
        "address": patient.Patient_Adress,
        "img": patient.Image_Url,
        "cronic": patient.HasCronicPatient,
        "vaccinated": true,
        "unitid": patient.Unit_Id
      }

      this.doctorService.updatePatient(patientObj, patient.Patient_Id).subscribe(res => {
        if (res == 'OK') {
          this.alertify.success("Hasta Onaylandı")
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }
      })
    }
    else {
      this.alertify.error('Tarih Uygun Degil')
    }


  }

  finish(patient) {

    if (new Date(patient.Appointment_Date) >= new Date(Date.now())) {


      const patientObj = {
        "name": patient.Patient_FullName,
        "age": patient.Patient_Age,
        "phone": patient.Patient_Phone,
        "address": patient.Patient_Adress,
        "img": patient.Image_Url,
        "cronic": patient.HasCronicPatient,
        "vaccinated": true,
        "unitid": patient.Unit_Id
      }
      this.doctorService.updatePatient(patientObj, patient.Patient_Id).subscribe(res => {
        if (res == 'OK') {
          this.alertify.success("Hasta Fazları Tamamlandı")

        }
      }
      )

      this.doctorService.deletePhaseState(patient.Id).subscribe(res => {
        if (res == 'OK') {
         
          setTimeout(() => {
            window.location.reload()
          }, 1000);

        }
      })
    }
    else {
      this.alertify.error('Tarih Uygun Degil')
    }


  }

  delete(patient) {
    this.doctorService.deletePhaseState(patient.Id).subscribe(res => {
      if (res == 'OK') {
        this.alertify.success('Randevu İptal Edildi')
        setTimeout(() => {
          window.location.reload()
        }, 1000);

      }
    })


  }

}
