import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from 'src/models/doctor';
import { HealthUnit } from 'src/models/unit';
import { AlertifyService } from 'src/services/alertify.service';
import { HealthunitService } from 'src/services/healthunit.service';

@Component({
  selector: 'unit-unitdoctors',
  templateUrl: './unitdoctors.component.html',
  styleUrls: ['./unitdoctors.component.css']
})
export class UnitdoctorsComponent implements OnInit {

  @Input() data
  doctors: Doctor[]
  doctorForm: FormGroup
  unit: HealthUnit

  constructor(private alertify: AlertifyService, private unitService: HealthunitService, private formBuilder: FormBuilder) {

    this.doctorForm = formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      imageurl: ['', Validators.required],

    })
  }

  ngOnInit(): void {

    this.unitService.getDoctorsByUnit(this.data.unitId).subscribe(resData => {
      this.doctors = resData
    })

    this.unitService.getUnitInfo(this.data.unitId).subscribe(data => {
      this.unit = data
    })



  }
  submitForm() {
    if (!this.doctorForm.valid) {
      this.alertify.error('Hatalı Form !!')
    }
    if (this.doctorForm.valid) {
      const doctorObj = {
        "name": this.doctorForm.value.name,
        "phone": this.doctorForm.value.phone,
        "adress": this.doctorForm.value.address,
        "unitid": this.data.unitId,
        "imageurl": this.doctorForm.value.imageurl
      }


      this.unitService.createDoctor(doctorObj).subscribe(res => console.log(res))
      setTimeout(window.location.reload.bind(location), 1000);
      this.alertify.success("Doktor Kayıt Edildi")
    }
  }

  deleteDoctor(doctor) {
    console.log(doctor.Id)

    this.unitService.deleteDoctorById(doctor.Id).subscribe(res => {
      if (res == 'OK') {
        this.alertify.success('Doktor Silindi')
        setTimeout(window.location.reload.bind(location), 1000);

      }
    })
  }
}
