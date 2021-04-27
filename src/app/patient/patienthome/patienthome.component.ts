import { Component, Input, OnInit } from '@angular/core';
import { PatientTable } from 'src/models/patient_table';
import { PatientService } from 'src/services/patient.service';

@Component({
  selector: 'patient-patienthome',
  templateUrl: './patienthome.component.html',
  styleUrls: ['./patienthome.component.css']
})
export class PatienthomeComponent implements OnInit {
  @Input() data
  patient: PatientTable

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.getPatientInfoById(this.data.patientId).subscribe(ddt => {
      this.patient = ddt
      
    })
  }

 
}
