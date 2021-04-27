import { Component, Input, OnInit } from '@angular/core';
import { HealthUnit } from 'src/models/unit';
import { DoctorService } from 'src/services/doctor.service';

@Component({
  selector: 'doctor-doctorunit',
  templateUrl: './doctorunit.component.html',
  styleUrls: ['./doctorunit.component.css']
})
export class DoctorunitComponent implements OnInit {
  @Input() data
  unit: HealthUnit
  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {

    this.doctorService.getDoctorUnitById(this.data.doctorId).subscribe(dt => {
      this.unit = dt
    })

  }

}
