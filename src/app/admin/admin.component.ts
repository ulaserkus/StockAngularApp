import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
}) 
export class AdminComponent implements OnInit {
  data
  ministary_ıd: number
  token = localStorage.getItem("jwt")
  helper = new JwtHelperService()
  component_number: number 

  constructor(private router: Router) { }

  ngOnInit(): void {

    const decoded = this.helper.decodeToken(this.token)
    this.ministary_ıd = decoded["ministary_id"].valueOf()
    this.component_number = 1

    this.data = {
      ministaryId: this.ministary_ıd
    }

  }

  logOut() {

    localStorage.removeItem("jwt")
    this.router.navigateByUrl('/info')

  }

  homeBtn() {
    this.component_number = 1


  }
  producerBtn() {
    this.component_number = 2


  }
  unitBtn() {
    this.component_number = 3



  }
  productBtn() {
    this.component_number = 4


  }
  userBtn() {
    this.component_number = 5


  }
}
