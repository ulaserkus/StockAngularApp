import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HealthUnit } from 'src/models/unit';
import { AlertifyService } from 'src/services/alertify.service';
import { HealthunitService } from 'src/services/healthunit.service';


@Component({
  selector: 'unit-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() data
  updateForm: FormGroup
  unit: HealthUnit
  constructor(private alertify: AlertifyService, private unitService: HealthunitService, private formBuilder: FormBuilder) {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required]],
      img: ['', Validators.required],
    })
  }

  ngOnInit(): void {

    this.unitService.getUnitInfo(this.data.unitId).subscribe(data => {
      this.unit = data

      this.updateForm.get('name').setValue(data.Unit_Name)
      this.updateForm.get('address').setValue(data.Unit_Adress)
      this.updateForm.get('phone').setValue(data.Unit_Phone)
      this.updateForm.get('img').setValue(data.Image_Url)

    })
  }

  update() {

    if (this.updateForm.valid) {

      const unitObj = {
        "name": this.updateForm.value.name,
        "adress": this.updateForm.value.address,
        "phone": this.updateForm.value.phone,
        "ministaryid": this.unit.Ministary_Id,
        "image_url": this.updateForm.value.img
      }

      console.log(unitObj)
      console.log(this.unit.Id)
      this.unitService.updateUnitById(unitObj, this.unit.Id).subscribe(res => {
        if (res == 'OK') {
          this.alertify.success("Güncelleme Başarılı")
          setTimeout(window.location.reload.bind(location),1000)
        }
      })


    }

    if (!this.updateForm.valid) {

      this.alertify.error('Hatalı Form !!')

    }










  }
}
