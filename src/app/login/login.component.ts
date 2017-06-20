import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Auth } from '../domain/entities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  auth: Auth;

  constructor(@Inject('auth') private service, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(formValue){
    console.log(formValue);

    this.service
      .loginWithCredentials(formValue.login.username, formValue.login.password)
      .then(auth => {
        let redirectUrl = (auth.redirectUrl === null)? '/': auth.redirectUrl;

        console.log(redirectUrl);

        if(!auth.hasError){
          this.router.navigate([redirectUrl]);
          localStorage.removeItem('redirectUrl');
        } else {
          // 复制一份 auth
          this.auth = Object.assign({}, auth);
        }
      });
  }

}
