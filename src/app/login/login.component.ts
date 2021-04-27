import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {


  form: FormGroup
  helper = new JwtHelperService()

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService, private router: Router, private alertify: AlertifyService) {

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  ngOnInit(): void {
  }


  login() {


    if (this.form.valid) {

      const userObject = {
        "username": this.form.value.username,
        "password": this.form.value.password
      }

      this.authService.login(userObject).subscribe(user => {
        if (user == null) {
          this.alertify.error("error");

        }

        const tokenValue = user["accessToken"].valueOf()
        localStorage.setItem("jwt", tokenValue)
        const decodeUser = this.helper.decodeToken(tokenValue)


        switch (decodeUser.role) {

          case "admin":
            this.router.navigateByUrl('/admin')
            break

          case "doctor":
            this.router.navigateByUrl('/doctor')
            break

          case "patient":
            this.router.navigateByUrl('/patient')
            break

          case "healthunit":
            this.router.navigateByUrl('/healthunit')
            break

          case "producer":
            this.router.navigateByUrl('/producer')
            break



          default:
            this.router.navigateByUrl('/')
            break
        }
        this.alertify.success("Giriş başarılı")
      })

    }
    else {

      this.alertify.warning("Eksik bilgiler !")
    }

  }

}
