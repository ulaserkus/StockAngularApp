import { Component, Input, OnInit } from '@angular/core';
import { Ministary } from 'src/models/ministary';
import { Report } from 'src/models/report';
import { HealthUnit } from 'src/models/unit';
import { AlertifyService } from 'src/services/alertify.service';
import { MinistaryService } from 'src/services/ministary.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  @Input() data
  ministary: Ministary
  units: HealthUnit[]
  reports: Report[]
  sure: boolean = false
  constructor(private alertify: AlertifyService, private ministaryService: MinistaryService) { }

  ngOnInit(): void {

    this.ministaryService.getHealthUnitsByMinistaryId(this.data.ministaryId).subscribe(list => {
      this.units = list
    })

    this.ministaryService.getReportsByMinistaryId(this.data.ministaryId).subscribe(data => {
      this.reports = data
    })

    this.ministaryService.getMinistaryInfos(this.data.ministaryId).subscribe(res => {
      this.ministary = res
    })

  }


  deleteUnit(unit) {


    console.log(unit.Id)
    this.ministaryService.deleteUnitById(unit.Id).subscribe(res => {
      console.log(res)
    })
    this.alertify.success("Birime Ait Veriler Silindi")

    setTimeout(window.location.reload.bind(location), 1000)



  }
  sendVaccine(report) {
    console.log(report.Id)
    console.log(report.Unit_Needs)

    if (Number(this.ministary.Total_Vaccine_Count) >= Number(report.Unit_Needs)) {
      const ministaryObj = {
        "name": this.ministary.Ministary_Country,
        "need": this.ministary.Ministary_Needs,
        "total": (Number(this.ministary.Total_Vaccine_Count) - Number(report.Unit_Needs)).toString(),
        "img": this.ministary.Image_Url,
        "lastdate": this.ministary.Last_Purchase_Date,
        "lastcount": this.ministary.Last_Purchased_Vaccine_Count
      }
      this.ministaryService.deleteUnitReportById(report.Id).subscribe(res => {
        if (res == 'OK') {
          this.ministaryService.updateMinistaryById(ministaryObj, this.data.ministaryId).subscribe(res => {

            console.log(res)
          })
          this.alertify.success("Teslimat Onaylandı")
          setTimeout(window.location.reload.bind(location), 1000);

        }
      })

    } else {
      this.alertify.error('Yetersiz Aşı !!')
    }

  }

}
