import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from 'src/models/doctor';
import { HealthUnit } from 'src/models/unit';
import { User } from 'src/models/user';
import { AlertifyService } from 'src/services/alertify.service';
import { MinistaryService } from 'src/services/ministary.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @Input() data
  dusers: User[]
  husers: User[]
  noRegisteredDoctors: Doctor[]
  noRegisteredUnits: HealthUnit[]
  optionText: string = "Sağlık Birimi"
  lastHealthUnitId: number
  lastDoctorId: number
  units: HealthUnit[]
  unitForm: FormGroup
  doctorForm: FormGroup
  userForm: FormGroup
  unitId: number
  rol: string
  ıd: number

  constructor(private ministaryService: MinistaryService,
    private formBuilder: FormBuilder, private alertify: AlertifyService) {

    this.unitForm = formBuilder.group({
      unitname: ['', Validators.required],
      unitphone: ['', Validators.required],
      unitaddress: ['', Validators.required],
      unitimageurl: ['', Validators.required],
    })

    this.doctorForm = formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      address: ['', Validators.required],
      imageurl: ['', Validators.required],

    })

    this.userForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],

    })


  }



  ngOnInit(): void {

    this.ministaryService.getDoctorUsersByMinistaryId(this.data.ministaryId).subscribe(data => {
      this.dusers = data
    })

    this.ministaryService.getNotregisteredDoctors(this.data.ministaryId).subscribe(data => {
      this.noRegisteredDoctors = data
    })

    this.ministaryService.getUnitUsersByMinistaryId(this.data.ministaryId).subscribe(data => {
      this.husers = data
    })

    this.ministaryService.getNotregisteredUnits(this.data.ministaryId).subscribe(data => {
      this.noRegisteredUnits = data
    })


    this.ministaryService.getLastHealthUnitId().subscribe(data => {
      this.lastHealthUnitId = data.Id
    })

    this.ministaryService.getLastDoctorId().subscribe(data => {
      this.lastDoctorId = data.Id
    })

    this.ministaryService.getHealthUnitsByMinistaryId(this.data.ministaryId).subscribe(list => {
      this.units = list
    })



  }

  onChange($event) {
    this.optionText = $event.target.options[$event.target.options.selectedIndex].text;
  }
  onChangedId($event) {
    let unitName = $event.target.options[$event.target.options.selectedIndex].text;
    let unit = this.units.filter(x => x.Unit_Name === unitName)
    this.unitId = unit[0].Id
  }

  submitForm() {


    if (this.optionText == 'Sağlık Birimi' && this.unitForm.valid) {

      const unitObj = {
        "name": this.unitForm.value.unitname,
        "adress": this.unitForm.value.unitaddress,
        "phone": this.unitForm.value.unitphone,
        "ministaryid": this.data.ministaryId,
        "image_url": this.unitForm.value.unitimageurl
      }

      this.ministaryService.createUnit(unitObj).subscribe(res => {
        console.log(res)
      })

      console.log(unitObj)


      setTimeout(window.location.reload.bind(location), 1000);
      this.alertify.success("Birim Kayıt Edildi")
    }

    else if (this.optionText === 'Doktor') {

      const doctorObj = {
        "name": this.doctorForm.value.name,
        "phone": this.doctorForm.value.phone,
        "adress": this.doctorForm.value.address,
        "unitid": this.unitId,
        "imageurl": this.doctorForm.value.imageurl
      }


      this.ministaryService.createDoctor(doctorObj).subscribe(res => console.log(res))


      setTimeout(window.location.reload.bind(location), 1000);
      this.alertify.success("Doktor Kayıt Edildi")
    }

  }
  submitUser() {

    if (this.rol === 'doctor') {
      const userObj = {
        "username": this.userForm.value.username,
        "password": this.userForm.value.password,
        "role": this.rol,
        "ministary_id": null,
        "patient_id": null,
        "doctor_id": this.ıd,
        "unit_id": null,
        "producer_id":null
      }

      this.ministaryService.createUser(userObj).subscribe(res => {
        console.log(res)
      })
      this.alertify.success("Kullanıcı Kayıt Edildi")
      setTimeout(window.location.reload.bind(location), 1000);


    } else if (this.rol === 'healthunit') {
      const userObj = {
        "username": this.userForm.value.username,
        "password": this.userForm.value.password,
        "role": this.rol,
        "ministary_id": null,
        "patient_id": null,
        "doctor_id": null,
        "unit_id": this.ıd,
        "producer_id":null
      }

      this.ministaryService.createUser(userObj).subscribe(res => {
        console.log(res)
      })
      setTimeout(window.location.reload.bind(location), 1000);
      this.alertify.success("Kullanıcı Kayıt Edildi")


    } else if (!this.userForm.valid) {
      this.alertify.error("Eksik Bilgiler")
    }





  }
  getRole(role) {

    let Role = role.split('+')[0]
    let numb = role.split('+')[1]

    this.rol = Role
    this.ıd = numb
 
  }

  deleteUser(user) {

    console.log(user.Id)
    this.ministaryService.deleteUser(user.Id).subscribe(res => {
      console.log(res)
    })
    
    this.alertify.success("Kullanıcı Silindi")
    setTimeout(window.location.reload.bind(location), 1000);

  }

}
