import { Component, Input, OnInit } from '@angular/core';
import { Producer } from 'src/models/producer';
import { AlertifyService } from 'src/services/alertify.service';
import { ProducerService } from 'src/services/producer.service';

@Component({
  selector: 'producer-producerhomepage',
  templateUrl: './producerhomepage.component.html',
  styleUrls: ['./producerhomepage.component.css']
})
export class ProducerhomepageComponent implements OnInit {
  @Input() data
  producer:Producer
  constructor(private alertify:AlertifyService,private producerService:ProducerService) { }

  ngOnInit(): void {
    console.log(this.data.producerId)
    
    this.producerService.getProducerById(this.data.producerId).subscribe(res=>{
       this.producer=res
       console.log(this.producer)
    })

  }

}
