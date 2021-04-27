import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { Percantage } from 'src/models/Percantage';
import { InfoService } from 'src/services/info.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'info-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {
  @ViewChild("chart2") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  CountryPercantage: Percantage[]
  Total:number

  constructor(private infoService: InfoService) {

    this.chartOptions = {
      series: [],
      chart: {
        width: 300,
        type: "pie"
      },
      labels: [],
      responsive: [
        {
          breakpoint: 300,
          options: {
            chart: {
              width: 100
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit() {

    this.infoService.getMinistaryAndVaccineCount().subscribe(res => {
      this.CountryPercantage = res
      this.Total = res.reduce((total, arg) => total + Number(arg.Total_Vaccine_Count), 0)
      
    

      this.CountryPercantage.forEach(x=>{
        
        
        this.chartOptions.labels.push(x.Ministary_Country)
        x.Total_Vaccine_Count=(Number(x.Total_Vaccine_Count)/this.Total)*100
        this.chartOptions.series.push(Math.round(x.Total_Vaccine_Count))
        
        console.log(Math.round(x.Total_Vaccine_Count))

       
      })
     
    })

  }
}

