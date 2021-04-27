import { Component, Input, OnInit } from '@angular/core';
import { Doctor } from 'src/models/doctor';
import { DoctorService } from 'src/services/doctor.service';

@Component({
  selector: 'doctor-doctorhome',
  templateUrl: './doctorhome.component.html',
  styleUrls: ['./doctorhome.component.css']
})
export class DoctorhomeComponent implements OnInit {
  @Input() data
  doctor: Doctor
  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {

    this.doctorService.getDoctorById(this.data.doctorId).subscribe(dt => {
      this.doctor = dt
    })
  }

}
