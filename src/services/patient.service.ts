import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/models/appointment';
import { Doctor } from 'src/models/doctor';
import { PatientTable } from 'src/models/patient_table';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  path = "http://localhost:5000"

  getPatientInfoById(id: number): Observable<PatientTable> {
    return this.http.get<PatientTable>(this.path + `/api/patient/${id}`)
  }

  getPatientAppointments(id: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.path + `/api/patient/appointment/${id}`)
  }

  getPhaseStateByPatientId(id:number):Observable<any>{
    return this.http.get<any>(this.path+`/api/appointments/phase/${id}`)
  }

  getDoctorsByUnit(id: number): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.path + `/api/doctor/unit/${id}`)
  }
  
  getDoctorsByMinistary(id:number):Observable<Doctor[]>{
    return this.http.get<Doctor[]>(this.path + `/api/doctor/doctors/${id}`)
  }
  getLastAppointment():Observable<any>{
    return this.http.get<any>(this.path + `/api/appointments/last`)
  }

  createAppointment(object: object): Observable<any> {
    return this.http.post(this.path + `/api/appointments/create`, object, { responseType: 'text' })
  }

  createPhaseState(object: object): Observable<any> {
    return this.http.post(this.path + `/api/appointments/createphase`, object, { responseType: 'text' })
  }



}
