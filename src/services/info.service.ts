import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Percantage } from 'src/models/Percantage';
import { PercantageStock } from 'src/models/PercantageStock';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private http: HttpClient) { }

  path = "http://localhost:5000"

  getLastMinistaryId():Observable<any> {
   return this.http.get<any>(this.path + "/api/ministary/id/last")
  }

  getLastProducerId():Observable<any>{
    return this.http.get<any>(this.path+'/api/producer/last/id')
  }

  getProducerAndVaccineCount():Observable<PercantageStock[]>{
    return this.http.get<PercantageStock[]>(this.path+'/api/vaccinestock/count')
  }

  getMinistaryAndVaccineCount():Observable<Percantage[]>{
    return this.http.get<Percantage[]>(this.path+'/api/ministary/percantage/list')
  }

  createMinistary(obj):Observable<any>{
    return this.http.post(this.path+"/api/ministary/value/create",obj,{responseType:'text'})
  }

  createUser(object: object):Observable<any> {
    return this.http.post(this.path + `/api/healthunits/createuser`, object, { responseType: 'text' })
  }

  createProducer(object: object): Observable<any> {
    return this.http.post(this.path + `/api/producer/create`, object, { responseType: 'text' })
  }
}
