
import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from "jquery";
import { Claim } from 'src/models/Claim';
import { Ministary } from 'src/models/ministary';
import { ProducerStocks } from 'src/models/producersstocks';
import { AlertifyService } from 'src/services/alertify.service';
import { ProducerService } from 'src/services/producer.service';

@Component({
  selector: 'producer-producerstockpage',
  templateUrl: './producerstockpage.component.html',
  styleUrls: ['./producerstockpage.component.css']
})
export class ProducerstockpageComponent implements OnInit {
  @Input() data
  stockForm: FormGroup
  products: ProducerStocks[]
  stockId: number
  ministaryId: number
  isDisable: boolean
  Ministaries: Ministary[]
  @ViewChild('hello', { static: false }) divHello: ElementRef
  @Output() clickFunc = new EventEmitter()
  closeResult: string
  message
  claims: Claim[]
  selectedClaims: Claim[]
  selectedVaccineCount: number
  selectedStockVaccineCount: number
  vaccineId: number
  VaccineStockObj:object

  constructor(private modalService: NgbModal, private producerService: ProducerService, private formBuilder: FormBuilder, private alertify: AlertifyService) {

    this.stockForm = formBuilder.group({
      name: ['', Validators.required],
      count: ['', Validators.required],
      img: ['', Validators.required],
    });



  }

  ngOnInit(): void {

    this.producerService.getClaimList(this.data.producerId).subscribe(res => {
      this.claims = res
    })

    this.producerService.getProducersStocks(this.data.producerId).subscribe(result => {
      this.products = result
      console.log(result)
    })

    this.producerService.getMinistaryList(this.data.producerId).subscribe(res => {
      this.Ministaries = res

    });


  }


  ngAfterViewInit() {
    setTimeout(() => {
      this.producerService.getSendedStocks(this.data.producerId).subscribe(res => {
        res.forEach(x => {
          console.log(x.Stock_Id);
          (<HTMLInputElement>document.getElementById("btn" + x.Stock_Id)).disabled = true;

          (<HTMLInputElement>document.getElementById("btn" + x.Stock_Id)).innerHTML = "Bu Stok Kullanımda";
        });
      })



    }, 100);

  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  getMinistaryId(Id) {
    this.ministaryId = Id
    console.log(Id)

    this.selectedClaims = this.claims.filter(x => x.Ministary_Id == Id)

    console.log(this.claims)

  }
  getStockId(product) {

    this.stockId = product.Id
    this.selectedStockVaccineCount = product.Vaccine_Count

  
    
    this.VaccineStockObj = {
      "name": product.Vaccine_Name,
      "date": product.Last_Production_Date,
      "count": product.Vaccine_Count,
      "producerid":product.Producer_Id,
      "img":product.Image_Url
    }

    this.vaccineId=product.Vaccine_Id
    console.log(product)
   
  

  }
  getVaccineCount(count) {
    this.selectedVaccineCount = count
  }

  createMinistaryStock() {

    if (this.selectedStockVaccineCount >= this.selectedVaccineCount) {

    

        (<HTMLInputElement>document.getElementById("btn" + this.stockId)).disabled = true;

        (<HTMLInputElement>document.getElementById("btn" + this.stockId)).innerHTML = "Teslimat Yapılıyor !";

        const ministaryStockObj = {
          "ministaryid": this.ministaryId,
          "stockid": this.stockId,
          "count": this.selectedVaccineCount
        }
        this.VaccineStockObj["count"]=this.selectedStockVaccineCount-this.selectedVaccineCount
        
        this.producerService.updateStockById(this.VaccineStockObj,this.vaccineId).subscribe(res=>{
          if(res=='OK'){
            this.producerService.createMinistaryStock(ministaryStockObj).subscribe(res => {
              if (res == 'OK') {
                this.alertify.success('Stok Teslim Edildi')
                let claim = this.selectedClaims.find(x=>x.Vaccine_Count==this.selectedVaccineCount)
                this.producerService.deleteClaimStock(claim.Id).subscribe(res=>{
                })
                setTimeout(() => {
                  window.location.reload()
                }, 1000);
              }
            })
          }
        })
        

        
           
      console.log(this.VaccineStockObj)


    } else {
      this.alertify.error('Yetersiz Adet !')
    }


  }


  createStock() {

    if (this.stockForm.valid) {

      const stockObj = {

        "name": this.stockForm.value.name,
        "count": this.stockForm.value.count,
        "date": new Date(Date.now()),
        "producerid": this.data.producerId,
        "img": this.stockForm.value.img,

      }
      this.producerService.createStock(stockObj).subscribe(res => {
        if (res == 'OK') {
          this.alertify.success("Stok Kayıt Edildi")
          setTimeout(
            window.location.reload.bind(location)
            , 1000)
        }
      })

    }

    if (!this.stockForm.valid) {
      this.alertify.error("Hatalı Form")
    }
  }

}
