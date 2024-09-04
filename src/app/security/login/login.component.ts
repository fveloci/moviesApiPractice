import { Component } from '@angular/core';
import { AuthFormComponent } from "../auth-form/auth-form.component";
import { userCredentials } from '../../interfaces/security';
import { SecurityService } from '../../services/security.service';
import { parseErrorsFromApi } from '../../helpers/mappers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private securityService: SecurityService, private router: Router) {

  }
  errors: string[] = []


  login(credentials: userCredentials) {
    this.securityService.login(credentials)
      .subscribe({
        next: (response) => {
          this.securityService.saveToken(response)
          this.router.navigate(['/'])
        },
        error: (errors) => {
          this.errors = parseErrorsFromApi(errors)
        }
      })
  }
}
