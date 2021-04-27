import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  data
  doctor_ıd: number
  token = localStorage.getItem("jwt")
  helper = new JwtHelperService()
  component_number: number

  constructor(private router:Router) { }

  ngOnInit(): void {
    
    const decoded = this.helper.decodeToken(this.token)
    this.doctor_ıd = decoded["doctor_id"].valueOf()
    this.component_number = 1
    

    this.data = {
      doctorId: this.doctor_ıd
    }
  }

  
  homeBtn() {
    this.component_number = 1


  }
  unitBtn() {
    this.component_number = 2


  }
  patientBtn() {
    this.component_number = 3

  }
  
  logOut() {

    localStorage.removeItem("jwt")
    this.router.navigateByUrl('/info')

  }

}
