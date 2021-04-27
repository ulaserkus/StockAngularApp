import { Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProducerstockpageComponent } from './producerstockpage/producerstockpage.component';

@Component({
  selector: 'app-producerpage',
  templateUrl: './producerpage.component.html',
  styleUrls: ['./producerpage.component.css']
})
export class ProducerpageComponent implements OnInit {
  data
  producer_ıd: number
  token = localStorage.getItem("jwt")
  helper = new JwtHelperService()
  component_number: number
 
  @ViewChildren('stockChild') ProducerstockpageComponent: ProducerstockpageComponent 


  constructor(private router: Router) { }

  ngOnInit(): void {

    const decoded = this.helper.decodeToken(this.token)
    this.producer_ıd = decoded["producer_id"].valueOf()
    
    console.log(this.producer_ıd)
    this.component_number = 1

    this.data = {
      producerId: this.producer_ıd
    }
  }
  
   



  logOut() {

    localStorage.removeItem("jwt")
    this.router.navigateByUrl('/info')

  }

  homeBtn() {
    this.component_number = 1
  }
  stockBtn() {
    this.component_number = 2
  }

  claimBtn() {
    this.component_number = 3

  }

  
  postMessage(messageFromChild) {
    this.component_number=messageFromChild.component
    
  }


}
