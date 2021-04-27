import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { PercantageStock } from 'src/models/PercantageStock';
import { InfoService } from 'src/services/info.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'info-piechartstock',
  templateUrl: './piechartstock.component.html',
  styleUrls: ['./piechartstock.component.css']
})
export class PiechartstockComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  stocks: PercantageStock[]
  Total = 0

  constructor(private infoService: InfoService) {
    this.chartOptions = {
      series: [],
      chart: {
        width: 350,
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
    this.infoService.getProducerAndVaccineCount().subscribe(res => {
      this.stocks = res
      this.Total = res.reduce((total, a) => total = total + Number(a.Total_Stock), 0)

      this.stocks.forEach(x => {
        x.Total_Stock = Math.round((Number(x.Total_Stock) / this.Total) * 100)
        this.chartOptions.series.push(x.Total_Stock)
        this.chartOptions.labels.push(x.Producer_Name)


      })
    })

  }
}

