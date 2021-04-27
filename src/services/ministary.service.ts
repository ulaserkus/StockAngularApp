import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from 'src/models/doctor';
import { Ministary } from 'src/models/ministary';
import { Producer } from 'src/models/producer';
import { ProducerStocks } from 'src/models/producersstocks';
import { Report } from 'src/models/report';
import { HealthUnit } from 'src/models/unit';
import { User } from 'src/models/user';


@Injectable({
  providedIn: 'root'
})
export class MinistaryService {

  constructor(private http: HttpClient) { }

  path = "http://localhost:5000"

  getMinistaryInfos(id: number): Observable<Ministary> {

    return this.http.get<Ministary>(this.path + `/api/ministary/${id}`);

  }

  getProducerListInfos(id:number): Observable<Producer[]> {
    return this.http.get<Producer[]>(this.path + `/api/producer/${id}`)
  }

  getHealthUnitsByMinistaryId(id: number): Observable<HealthUnit[]> {

    return this.http.get<HealthUnit[]>(this.path + `/api/healthunits/${id}`)
  }

  getProducersStocks(id: number): Observable<ProducerStocks[]> {

    return this.http.get<ProducerStocks[]>(this.path + `/api/producer/withstocks/${id}`)

  }


  getUsers(): Observable<User[]> {

    return this.http.get<User[]>(this.path + `/api/user`)

  }



  getDoctorUsersByMinistaryId(id: number): Observable<User[]> {
    return this.http.get<User[]>(this.path + `/api/user/doctors/${id}`)
  }

  getNotregisteredDoctors(id: number): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.path + `/api/user/noregistered/doctors/${id}`)
  }
  getUnitUsersByMinistaryId(id: number): Observable<User[]> {
    return this.http.get<User[]>(this.path + `/api/user/units/${id}`)
  }

  getNotregisteredUnits(id: number): Observable<HealthUnit[]> {
    return this.http.get<HealthUnit[]>(this.path + `/api/user/noregistered/units/${id}`)
  }

  getReportsByMinistaryId(id: number): Observable<Report[]> {
    return this.http.get<Report[]>(this.path + `/api/healthunits/report/${id}`)
  }

  getLastHealthUnitId(): Observable<any> {
    return this.http.get<any>(this.path + `/api/healthunits/last`)
  }

  getLastDoctorId(): Observable<any> {
    return this.http.get<any>(this.path + "/api/doctor/doctorId/last")
  }
  getProducerMinistaryStock(id: number): Observable<ProducerStocks[]> {
    return this.http.get<ProducerStocks[]>(this.path + `/api/vaccinestock/ministary/${id}`)
  }
  getProducerMinistary(id: number): Observable<Producer[]> {
    return this.http.get<Producer[]>(this.path + `/api/producerministary/producers/${id}`)
  }

  createUnit(object) {
    return this.http.post(this.path + `/api/healthunits/create`, object, { responseType: 'text' })
  }

  createDoctor(object) {
    return this.http.post(this.path + '/api/doctor/create', object, { responseType: 'text' })
  }

  createUser(object: object) {
    return this.http.post(this.path + `/api/healthunits/createuser`, object, { responseType: 'text' })
  }

  createProducer(object: object): Observable<any> {
    return this.http.post(this.path + `/api/producer/create`, object, { responseType: 'text' })
  }

  createProducerMinistary(object: object) {
    return this.http.post(this.path + `/api/producerministary/create`, object, { responseType: 'text' })
  }

  createStock(object: object): Observable<any> {
    return this.http.post(this.path + `/api/vaccinestock/create`, object, { responseType: 'text' })
  }

  createStockClaim(object: object): Observable<any> {
    return this.http.post(this.path + `/api/vaccinestock/createclaim`, object, { responseType: 'text' })
  }


  deleteUser(id: number) {
    return this.http.delete(this.path + `/api/user/delete/${id}`, { responseType: 'text' })
  }

  deleteUnitById(id: number) {
    return this.http.delete(this.path + `/api/healthunits/unit/delete/${id}`, { responseType: 'text' })
  }

  deleteUnitReportById(id: number) {
    return this.http.delete(this.path + `/api/healthunits/report/delete/${id}`, { responseType: 'text' })
  }

  deleteProducer(id: number): Observable<any> {
    return this.http.delete(this.path + `/api/producer/delete/${id}`, { responseType: 'text' })
  }
  deleteProducerMinistary(id: number): Observable<any> {
    return this.http.delete(this.path + `/api/producerministary/producer/${id}`, { responseType: 'text' })
  }


  updateMinistaryById(object, id: number) {
    return this.http.patch(this.path + `/api/ministary/update/${id}`, object, { responseType: 'text' })
  }

  updateStockById(object, id: number) {
    return this.http.patch(this.path + `/api/vaccinestock/update/${id}`, object, { responseType: 'text' })
  }

  updateClaimStockById(object, id: number) {
    return this.http.patch(this.path + `/api/vaccinestock/updateclaim/${id}`, object, { responseType: 'text' })
  }
}




