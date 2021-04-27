import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Ministary } from 'src/models/ministary';
import { Report } from 'src/models/report';
import { AlertifyService } from 'src/services/alertify.service';
import { MinistaryService } from 'src/services/ministary.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() data

  ministary: Ministary

  updateForm: FormGroup

  reports: Report[]

  Needs

  total=0
  constructor(private alertify: AlertifyService, private ministaryService: MinistaryService, private formBuilder: FormBuilder) {

    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      need: ['', Validators.required],
      total: ['', Validators.required],
      img: ['', Validators.required],
      lastdate: ['', Validators.required],
      lastcount: ['', Validators.required]

    })



  }

  ngOnInit(): void {
    this.ministaryService.getReportsByMinistaryId(this.data.ministaryId).subscribe(res => {
      this.reports = res
      this.Needs = res.reduce((total, arg) => total + Number(arg.Unit_Needs), 0)
      console.log(this.Needs)
    })
    
    

    this.ministaryService.getMinistaryInfos(this.data.ministaryId).subscribe(res => {
      this.ministary = res
      this.total = Number(res.Ministary_Needs) + this.Needs
      this.updateForm.get('name').setValue(res.Ministary_Country)
      this.updateForm.get('need').setValue(res.Ministary_Needs)
      this.updateForm.get('total').setValue(res.Total_Vaccine_Count)
      this.updateForm.get('img').setValue(res.Image_Url)
      this.updateForm.get('lastdate').setValue(res.Last_Purchase_Date)
      this.updateForm.get('lastcount').setValue(res.Last_Purchased_Vaccine_Count)
    })


  }


  update() {
    const ministaryObj = {
      "name": this.updateForm.value.name,
      "need": this.updateForm.value.need,
      "total": this.updateForm.value.total,
      "img": this.updateForm.value.img,
      "lastdate": this.updateForm.value.lastdate,
      "lastcount": this.updateForm.value.lastcount
    }
    this.ministaryService.updateMinistaryById(ministaryObj, this.data.ministaryId).subscribe(res => {

      console.log(res)
    })
    this.alertify.success("Bakanlık Güncellendi")
    setTimeout(window.location.reload.bind(location), 1000);




  }

}
