import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/services/alertify.service';
import { InfoService } from 'src/services/info.service';
import { MinistaryService } from 'src/services/ministary.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  registerForm: FormGroup
  producerForm: FormGroup

  optionText: string
  constructor(private router: Router, private alertify: AlertifyService, private formBuilder: FormBuilder, private infoservice: InfoService) {

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      need: ['', Validators.required],
      total: ['', Validators.required],
      img: ['', Validators.required],
      lastdate: ['', Validators.required],
      lastcount: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
    this.producerForm = formBuilder.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      img: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    })

  }

  ngOnInit(): void {
    this.optionText = 'Bakanlık'

  }

  option(value) {
    this.optionText = value.value
  }

  create() {

    if (this.registerForm.valid && this.optionText == 'Bakanlık') {


      const ministaryObj = {
        "name": this.registerForm.value.name,
        "need": this.registerForm.value.need,
        "total": this.registerForm.value.total,
        "img": this.registerForm.value.img,
        "lastdate": new Date(Date.now()),
        "lastcount": 0
      }


      this.infoservice.createMinistary(ministaryObj).subscribe(res => {
        console.log(res)
        if (res == 'OK') {
          this.infoservice.getLastMinistaryId().subscribe(res => {
            const userObj = {
              "username": this.registerForm.value.username,
              "password": this.registerForm.value.password,
              "role": "admin",
              "ministary_id": res.Id,
              "patient_id": null,
              "doctor_id": null,
              "unit_id": null,
              "producer_id": null
            }
            this.infoservice.createUser(userObj).subscribe(res => {
              this.alertify.success('Bakanlık Kayıt Edildi')
              this.router.navigateByUrl('/')
              setTimeout(
                window.location.reload.bind(location)
                , 1000);
            })
          })

        }

      })
    }
    else if (this.optionText == 'Bakanlık' && !this.registerForm.valid) {
      this.alertify.error("Hatalı Form !!")
    }
    else if (this.producerForm.valid && this.optionText == 'Üretici') {
      this.createProducer()
    } else if (!this.producerForm.valid && this.optionText == 'Üretici') {
      this.alertify.error("Hatalı Form !!")
    }
  }

  createProducer() {
    const producerObj = {

      "name": this.producerForm.value.name,
      "country": this.producerForm.value.country,
      "email": this.producerForm.value.email,
      "phone": this.producerForm.value.phone,
      "address": this.producerForm.value.address,
      "ministaryid": null,
      "img": this.producerForm.value.img

    }

    this.infoservice.createProducer(producerObj).subscribe(res => {
      if (res == 'OK') {

        this.infoservice.getLastProducerId().subscribe(res => {
          const userObj = {
            "username": this.producerForm.value.username,
            "password": this.producerForm.value.password,
            "role": "producer",
            "ministary_id": null,
            "patient_id": null,
            "doctor_id": null,
            "unit_id": null,
            "producer_id": res.Id
          }
          this.infoservice.createUser(userObj).subscribe(res => {
            this.alertify.success('Üretici Kayıt Edildi')
            this.router.navigateByUrl('/')
            setTimeout(
              window.location.reload.bind(location)
              , 1000);
          })
        })
      }
    })
  }
}
