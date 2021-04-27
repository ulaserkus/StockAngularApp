import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Claim } from 'src/models/Claim';
import { AlertifyService } from 'src/services/alertify.service';
import { ProducerService } from 'src/services/producer.service';

@Component({
  selector: 'producer-producerclaim',
  templateUrl: './producerclaim.component.html',
  styleUrls: ['./producerclaim.component.css']
})
export class ProducerclaimComponent implements OnInit {
  @Input() data
  @Output()
  postMessageEvent = new EventEmitter();
  message
  claims:Claim[]
  constructor(private producerService:ProducerService,private alertify:AlertifyService) { }

  ngOnInit(): void {
    this.producerService.getClaimList(this.data.producerId).subscribe(res=>{
      this.claims=res
    })

    this.message = {
       component:2,
    };
  }

  send(){
      this.postMessageEvent.emit(this.message);
  }

  delete(claim){

    console.log(claim.Id)

    this.producerService.deleteClaimStock(claim.Id).subscribe(res=>{
       if(res=='OK'){
         this.alertify.warning('Teslimat Reddedildi !')
         setTimeout(() => {
           window.location.reload()
         }, 1000);
       }
    })

  }

}
