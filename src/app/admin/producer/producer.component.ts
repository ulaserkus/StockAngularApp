import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producer } from 'src/models/producer';
import { AlertifyService } from 'src/services/alertify.service';
import { MinistaryService } from 'src/services/ministary.service';

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})
export class ProducerComponent implements OnInit {

  @Input() data
  producers: Producer[]
  notAddedProducers: Producer[]
  producerForm: FormGroup
  stockForm: FormGroup
  producerid: number
  selectedProducer: number

  constructor(private alertify: AlertifyService, private ministaryService: MinistaryService, private formBuilder: FormBuilder) {

    this.producerForm = formBuilder.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      img: ['', Validators.required],
    })

    this.stockForm = formBuilder.group({
      name: ['', Validators.required],
      count: ['', Validators.required],
      img: ['', Validators.required],
    })


  }

  ngOnInit(): void {

    this.ministaryService.getProducerListInfos(this.data.ministaryId).subscribe(list => {
      this.producers = list
    })

    this.ministaryService.getProducerMinistary(this.data.ministaryId).subscribe(res => {
      this.notAddedProducers = res
      this.notAddedProducers.forEach(x => {
        console.log(x.Id)
      })
    })

  }

  createProducer() {
    let a;

    this.notAddedProducers.forEach(x => {
      console.log(x.Id)
      a = x.Id
    })


    if (this.producerForm.valid) {
      const producerObj = {

        "name": this.producerForm.value.name,
        "country": this.producerForm.value.country,
        "email": this.producerForm.value.email,
        "phone": this.producerForm.value.phone,
        "address": this.producerForm.value.address,
        "ministaryid": this.data.ministaryId,
        "img": this.producerForm.value.img

      }

      this.ministaryService.createProducer(producerObj).subscribe(res => {
        if (res == 'OK') {
          this.alertify.success('Üretici Kayıt Edildi')
          setTimeout(
            window.location.reload.bind(location)
            , 1000)
        }
      })

    }


    if (!this.producerForm.valid || a == this.producerid) {
      this.alertify.error("Kullanıcı Mevcut")
    }
  }

  deleteProducer(producer) {


    this.ministaryService.deleteProducer(producer.Id).subscribe(res => {
      if (res == 'OK') {
        this.alertify.success('Üretici Silindi')
        setTimeout(
          window.location.reload.bind(location)
          , 1000)
      }
    })
  }

  selectId(value) {
    this.producerid = value
    console.log(value)
  }

  createStock() {



    const stockObj = {

      "name": this.stockForm.value.name,
      "count": this.stockForm.value.count,
      "date": new Date(Date.now()),
      "producerid": this.producerid,
      "img": this.stockForm.value.img,

    }

    this.ministaryService.createStock(stockObj).subscribe(res => {
      if (res == 'OK') {
        this.alertify.success("Stok Kayıt Edildi")
        setTimeout(
          window.location.reload.bind(location)
          , 1000)
      }
    })

    if (!this.stockForm.valid) {
      this.alertify.error("Hatalı Form")
    }
  }
  getProducerID(value) {
    console.log(value)

    this.selectedProducer = value
  }
  createProducerMinistary() {

    let a;

    this.notAddedProducers.forEach(x => {
      console.log(x.Id)
      a = x.Id
    })

    if (a != this.selectedProducer) {

      const producerObj = {
        "ministaryid": this.data.ministaryId,
        "producerid": this.selectedProducer
      }

      this.ministaryService.createProducerMinistary(producerObj).subscribe(res => {
        if (res == 'OK') {
          this.alertify.success('Üretici Eklendi')
          setTimeout(
            window.location.reload.bind(location)
            , 1000)
        }
      })
    }
    else{
      this.alertify.error("Üretici Mevcut")
    }


  }
  deleteProducerMinistary(producer) {

    this.ministaryService.deleteProducerMinistary(producer.Id).subscribe(res => {
      if (res == 'OK') {
        this.alertify.success('Üretici Silindi')
        setTimeout(
          window.location.reload.bind(location)
          , 1000)
      }
    })
  }
}
