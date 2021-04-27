import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/models/patient';
import { AlertifyService } from 'src/services/alertify.service';
import { HealthunitService } from 'src/services/healthunit.service';

@Component({
  selector: 'unit-unitpatients',
  templateUrl: './unitpatients.component.html',
  styleUrls: ['./unitpatients.component.css']
})
export class UnitpatientsComponent implements OnInit {
  form: FormGroup
  userForm: FormGroup
  patients: Patient[]
  noRegisteredPatients: Patient[]
  patientId: number
  @Input() data
  constructor(private unitService: HealthunitService, private alertify: AlertifyService, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      username: ['', [Validators.required, , Validators.pattern("^[0-9]*$"), Validators.maxLength(11),Validators.minLength(11)]],
      img: ['', [Validators.required]],
      cronic: [''],
    })

    this.userForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],

    })
  }

  ngOnInit(): void {
    this.form.get('cronic').setValue(false)

    this.unitService.getPatientsByUnitId(this.data.unitId).subscribe(data => {
      this.patients = data
    })

    this.unitService.getNotregisteredPatients(this.data.unitId).subscribe(data => {
      this.noRegisteredPatients = data
    })
  }
  savePatient() {

    if (!this.form.valid) {
      this.alertify.error('Hatalı Form !!')
    }
    if (this.form.valid) {

      const patientObj = {
        "name": this.form.value.name,
        "age": this.form.value.age,
        "phone": this.form.value.phone,
        "address": this.form.value.address,
        "img": this.form.value.img,
        "cronic": this.form.value.cronic,
        "vaccinated": false,
        "unitid": this.data.unitId
      }
      this.unitService.createPatient(patientObj).subscribe(res => {
        if (res == 'OK') {
          this.unitService.getLastPatientId().subscribe(res => {
            const userObj = {
              "username": this.form.value.username,
              "password": "1",
              "role": "patient",
              "ministary_id": null,
              "patient_id": res.Id,
              "doctor_id": null,
              "unit_id": null,
              "producer_id":null

            }
            this.unitService.createUser(userObj).subscribe(res => {

            })
            this.alertify.success('Hasta Kayıt Edildi')
            setTimeout(window.location.reload.bind(location), 1000)

          })

        }
      })

      console.log(patientObj)




    }

  }

  getId(patient) {
    this.patientId = patient
  }

  saveUser() {
    if (!this.userForm.valid) {
      this.alertify.error('Hatalı Form !!')
    }
    if (this.userForm.valid) {
      const userObj = {
        "username": this.userForm.value.username,
        "password": this.userForm.value.password,
        "role": "patient",
        "ministary_id": null,
        "patient_id": this.patientId,
        "doctor_id": null,
        "unit_id": null,
      }

      this.unitService.createUser(userObj).subscribe(res => {
        console.log(res)
      })
      setTimeout(window.location.reload.bind(location), 1000);
      this.alertify.success("Kullanıcı Kayıt Edildi")
    }

  }
  deletePatient(item) {
    console.log(item.Id)
    this.unitService.deletePatientById(item.Id).subscribe(res => {
      if (res == 'OK') {
        this.alertify.success('Hasta Silindi')
        setTimeout(window.location.reload.bind(location), 1000);
      }
    })
  }
}
