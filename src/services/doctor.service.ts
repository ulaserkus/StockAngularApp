import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/models/appointment';
import { AppointmentPatient } from 'src/models/appointmentPatient';
import { Doctor } from 'src/models/doctor';
import { Patient } from 'src/models/patient';
import { HealthUnit } from 'src/models/unit';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }
  path = "http://localhost:5000"

  getDoctorById(id: number): Observable<Doctor> {

    return this.http.get<Doctor>(this.path + `/api/doctor/${id}`)

  }

  getAppointmentsByDoctorId(id: number): Observable<Appointment[]> {

    return this.http.get<Appointment[]>(this.path + `/api/appointments/infos/doctor/${id}`)
  }

  getPhaseOneAppointments(id:number): Observable<AppointmentPatient[]> {

    return this.http.get<AppointmentPatient[]>(this.path + `/api/appointments/phaseone/${id}`)
  }

  getPhaseTwoAppointments(id:number): Observable<AppointmentPatient[]> {

    return this.http.get<AppointmentPatient[]>(this.path + `/api/appointments/phasetwo/${id}`)
  }
  getPhaseExtraAppointments(id:number): Observable<AppointmentPatient[]> {

    return this.http.get<AppointmentPatient[]>(this.path + `/api/appointments/phaseextra/${id}`)
  }

  getDoctorUnitById(id: number): Observable<HealthUnit> {
    return this.http.get<HealthUnit>(this.path + `/api/healthunits/doctorunit/${id}`)
  }

  getPatientsByDoctorId(id: number): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.path + `/api/patient/doctor/${id}`)
  }

  updatePatient(object: object, id: number): Observable<any> {
    return this.http.patch(this.path + `/api/patient/update/${id}`, object, { responseType: 'text' })
  }

  
  createAppointment(object: object): Observable<any> {
    return this.http.post(this.path + `/api/appointments/create`, object, { responseType: 'text' })
  }

  createPhaseState(object: object): Observable<any> {
    return this.http.post(this.path + `/api/appointments/createphase`, object, { responseType: 'text' })
  }

  deletePhaseState(id:number): Observable<any> {
    return this.http.delete(this.path + `/api/appointments/delete/${id}`, { responseType: 'text' })
  }
}
