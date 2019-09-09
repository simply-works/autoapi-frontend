import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';
// import awsmobile from 'src/aws-exports';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(private router: Router, private authenticationService: AuthService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

  logout() {
    // tslint:disable-next-line:max-line-length
    const URL = `${environment.awsmobile.domain}/logout?client_id=${environment.awsmobile.aws_user_pools_web_client_id}&logout_uri=${environment.awsmobile.logoutRedirectUrl}`;
    localStorage.removeItem('currentUser');
    this.authenticationService.currentUserSubject.next(null);
    window.location.assign(URL);
  }

  login() {
    // tslint:disable-next-line:max-line-length
    const URL = `${environment.awsmobile.domain}/login?response_type=code&client_id=${environment.awsmobile.aws_user_pools_web_client_id}&redirect_uri=${environment.awsmobile.redirectUrl}`;
    window.location.assign(URL);
  }

}
