import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  data
  patient_ıd: number
  token = localStorage.getItem("jwt")
  helper = new JwtHelperService()
  component_number: number 


  constructor(private router:Router) { }
   
  ngOnInit(): void {
    const decoded = this.helper.decodeToken(this.token)
    this.patient_ıd = decoded["patient_id"].valueOf()
    this.component_number = 1

    this.data = {
      patientId: this.patient_ıd
    }
  }

  homeBtn(){
    this.component_number=1
  }
  datesBtn(){
    this.component_number=2
  }
   
  logOut() {

    localStorage.removeItem("jwt")
    this.router.navigateByUrl('/info')

  }

}
