import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ministary } from 'src/models/ministary';
import { Producer } from 'src/models/producer';
import { ProducerStocks } from 'src/models/producersstocks';
import { AlertifyService } from 'src/services/alertify.service';
import { MinistaryService } from 'src/services/ministary.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Input() data
  products: ProducerStocks[]
  form: FormGroup
  stockObj: object
  stockId: number
  ministary: Ministary
  stockForm:FormGroup
  producers: Producer[]
  constructor(private alertify: AlertifyService, private formBuilder: FormBuilder, private ministaryService: MinistaryService) {
    this.form = this.formBuilder.group({
      count: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    })

    this.stockForm=this.formBuilder.group({
      count: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      producerId: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
   
    this.ministaryService.getProducerMinistary(this.data.ministaryId).subscribe(res => {
      this.producers = res

    })

    this.ministaryService.getMinistaryInfos(this.data.ministaryId).subscribe(res => {
      this.ministary = res
    })
    this.ministaryService.getProducerMinistaryStock(this.data.ministaryId).subscribe(res=>{
      this.products=res
      console.log(res)
    })
  }

  updateStock(stock) {
   
    this.stockId = stock.Id

    let stockObj = {
 
      "ministaryid": this.data.ministaryId,
      "stockid": stock.Stock_Id,
      "count": stock.Vaccine_Count,
    
  
    }
    console.log(this.stockObj)

    this.stockObj = stockObj
  }

  submit() {

    let lastCount = Number(this.form.value.count)
    let total = Number(this.ministary.Total_Vaccine_Count) + lastCount
    let need = Number(this.ministary.Ministary_Needs) - lastCount

    const ministaryObj = {
      "name": this.ministary.Ministary_Country,
      "need": need.toString(),
      "total": total.toString(),
      "img": this.ministary.Image_Url,
      "lastdate": new Date(Date.now()),
      "lastcount": lastCount.toString()
    }

    let number = Number(this.stockObj["count"].valueOf()) - Number(this.form.value.count)
    this.stockObj["count"] = number.toString()

    if (this.form.valid && number >= 0) {

      //stock ve ülke bilgisini güncelle
      console.log(this.stockId)
      console.log(this.stockObj)
      console.log(ministaryObj)

      this.ministaryService.updateMinistaryById(ministaryObj, this.data.ministaryId).subscribe(res => {

        console.log(res)

      })

      this.ministaryService.updateClaimStockById(this.stockObj,this.stockId).subscribe(res=>{
        if(res == 'OK'){
          this.alertify.success("Stok Ülkeye Eklendi")
          setTimeout(
            window.location.reload.bind(location)
            , 1000)
        }
      })


    }


    if (!this.form.valid) {
      this.alertify.error("Hatalı Form")
    }



  }


  createStock(){
    
    var claimObj={
      "count":this.stockForm.value.count,
      "date":new Date(Date.now()),
      "producerid":this.stockForm.value.producerId,
      "ministaryid":this.data.ministaryId,
    }

    this.ministaryService.createStockClaim(claimObj).subscribe(res=>{
      if(res=='OK'){
        this.alertify.success("Talep Oluşturuldu !")
        setTimeout(
          window.location.reload.bind(location)
          , 1000)
      }
    })
  

  }

}
