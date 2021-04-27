import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Claim } from 'src/models/Claim';
import { Ministary } from 'src/models/ministary';
import { Producer } from 'src/models/producer';
import { ProducerStocks } from 'src/models/producersstocks';

@Injectable({
  providedIn: 'root'
})
export class ProducerService {

  constructor(private http: HttpClient) { }


  path = "http://localhost:5000"

  getProducerById(id: number): Observable<Producer> {
    return this.http.get<Producer>(this.path + `/api/producer/producer/${id}`)
  }
  getProducersStocks(id: number): Observable<ProducerStocks[]> {

    return this.http.get<ProducerStocks[]>(this.path + `/api/producer/withstocks/${id}`)

  }
  getSendedStocks(id: number): Observable<any> {
    return this.http.get(this.path + `/api/vaccinestock/stocks/${id}`)
  }

  getMinistaryList(id:number): Observable<Ministary[]> {
    return this.http.get<Ministary[]>(this.path + `/api/ministary/ministaries/${id}`)
  }
  getClaimList(id:number):Observable<Claim[]>{
    return this.http.get<Claim[]>(this.path + `/api/vaccinestock/claims/${id}`)
  }
  createStock(object: object): Observable<any> {
    return this.http.post(this.path + `/api/vaccinestock/create`, object, { responseType: 'text' })
  }

  createMinistaryStock(object: object): Observable<any> {
    return this.http.post(this.path + `/api/vaccinestock/createministarystock`, object, { responseType: 'text' })
  }

  deleteClaimStock(id: number): Observable<any> {
    return this.http.delete(this.path + `/api/vaccinestock/deleteclaim/${id}`, { responseType: 'text' })
  }

  
  updateStockById(object, id: number) {
    return this.http.patch(this.path + `/api/vaccinestock/update/${id}`, object, { responseType: 'text' })
  }




}
