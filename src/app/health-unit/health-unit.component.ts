import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-health-unit',
  templateUrl: './health-unit.component.html',
  styleUrls: ['./health-unit.component.css']
})
export class HealthUnitComponent implements OnInit {
  data
  componentnumber: number
  token = localStorage.getItem("jwt")
  helper = new JwtHelperService()
  unit_ıd: number
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.componentnumber = 1

    const decoded = this.helper.decodeToken(this.token)
    this.unit_ıd = decoded["unit_id"].valueOf()


    this.data = {
      unitId: this.unit_ıd
     
    }
  }

  homeBtn() {
    this.componentnumber = 1
  }

  reportBtn() {
    this.componentnumber = 2
  }
  doctorBtn() {
    this.componentnumber = 3
  }
  patientBtn() {
    this.componentnumber = 4
  }
  logOut() {
    localStorage.removeItem("jwt")
    this.router.navigateByUrl('/info')

  }
}
