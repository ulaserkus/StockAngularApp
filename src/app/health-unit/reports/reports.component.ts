import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Report } from 'src/models/report';
import { AlertifyService } from 'src/services/alertify.service';
import { HealthunitService } from 'src/services/healthunit.service';

@Component({
  selector: 'unit-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  @Input() data
  form: FormGroup
  reports: Report[]

  constructor(private alertify: AlertifyService, private formBuilder: FormBuilder, private unitService: HealthunitService) {

      this.form=formBuilder.group({
        need:['',[Validators.required,Validators.pattern("^[0-9]*$")]]
      })

  }

  ngOnInit(): void {

    this.unitService.getReportsByUnitId(this.data.unitId).subscribe(resData => {
      this.reports = resData
    })
  }
  sendReport(){
    if(this.form.valid){
      const reportObj={
        "count":this.form.value.need,
        "need":this.form.value.need,
        "date":new Date(Date.now()),
        "unitid":this.data.unitId
      }

      console.log(reportObj)

      this.unitService.createUnitReport(reportObj).subscribe(res=>{
        if(res=='OK'){
          this.alertify.success("Rapor Eklendi")
          setTimeout(window.location.reload.bind(location),1000)
        }
      })
    }

    if(!this.form.valid){
      this.alertify.error('Hatalı Form !!')
    }
  }

  deleteReport(report){
    console.log()

    this.unitService.deleteUnitReportById(report.Id).subscribe(res=>{
      if(res=='OK'){
        this.alertify.warning('Rapor Silindi')
        setTimeout(window.location.reload.bind(location),1000)
      }
    })
  }
}
