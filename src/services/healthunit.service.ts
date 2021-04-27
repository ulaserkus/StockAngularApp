import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from 'src/models/doctor';
import { Patient } from 'src/models/patient';
import { Report } from 'src/models/report';
import { HealthUnit } from 'src/models/unit';

@Injectable({
  providedIn: 'root'
})
export class HealthunitService {

  constructor(private http: HttpClient) { }


  path = "http://localhost:5000"

  getUnitInfo(id: number): Observable<HealthUnit> {
    return this.http.get<HealthUnit>(this.path + `/api/healthunits/unit/${id}`)
  }

  getReportsByUnitId(id: number): Observable<Report[]> {
    return this.http.get<Report[]>(this.path + `/api/healthunits/unit/reports/${id}`)
  }

  getDoctorsByUnit(id: number): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.path + `/api/doctor/unit/${id}`)
  }
  getDoctorsByMinistaryId(id: number): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.path + `/api/doctor/doctors/${id}`)
  }
  getPatientsByUnitId(id: number): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.path + `/api/patient/patients/${id}`)
  }
  getNotregisteredPatients(id: number): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.path + `/api/user/noregistered/patients/${id}`)
  }
  getLastPatientId(): Observable<any> {
    return this.http.get<any>(this.path + `/api/healthunits/lastpatient`)
  }

  createUser(object: object) {
    return this.http.post(this.path + `/api/healthunits/createuser`, object, { responseType: 'text' })
  }

  createUnitReport(object) {
    return this.http.post(this.path + `/api/healthunits/createreport`, object, { responseType: 'text' })
  }

  createDoctor(object) {
    return this.http.post(this.path + '/api/doctor/create', object, { responseType: 'text' })
  }

  createPatient(object): Observable<any> {
    return this.http.post(this.path + `/api/patient/create`, object, { responseType: 'text' })
  }


  updateUnitById(object, id: number): Observable<any> {
    return this.http.patch(this.path + `/api/healthunits/update/${id}`, object, { responseType: 'text' })
  }


  deleteUnitReportById(id: number) {
    return this.http.delete(this.path + `/api/healthunits/report/delete/${id}`, { responseType: 'text' })
  }

  deletePatientById(id: number) {
    return this.http.delete(this.path + `/api/patient/delete/${id}`, { responseType: 'text' })
  }

  deleteDoctorById(id: number) {
    return this.http.delete(this.path + `/api/doctor/delete/${id}`, { responseType: 'text' })
  }
}
