import { Component } from '@angular/core';
import { AuthFormComponent } from "../auth-form/auth-form.component";
import { authResponse, userCredentials } from '../../interfaces/security';
import { SecurityService } from '../../services/security.service';
import { Observable } from 'rxjs';
import { parseErrorsFromApi } from '../../helpers/mappers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private securityService: SecurityService, private router: Router) {

  }

  errors: string[] = []

  register(credentials: userCredentials) {
    this.securityService.register(credentials)
      .subscribe({
        next: (response) => {
          this.securityService.saveToken(response)
          this.router.navigate(["/"])
        },
        error: (error) => {
          this.errors = parseErrorsFromApi(error)
        }
      })
  }
}
