import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.code) {
          authService.getAuthToken(params.code, 'authorization_code', 'code').subscribe((res) => {
            localStorage.setItem('currentUser', JSON.stringify(res));
            authService.currentUserSubject.next(res);
            router.navigate(['/list-project']);
          }, err => {
            console.log('errrr', err);
          });
        }
      });
   }

  ngOnInit() {
  }

}
