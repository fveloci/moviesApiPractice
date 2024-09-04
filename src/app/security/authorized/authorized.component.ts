import { Component, Input } from '@angular/core';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-authorized',
  standalone: true,
  imports: [],
  templateUrl: './authorized.component.html',
  styleUrl: './authorized.component.scss'
})
export class AuthorizedComponent {
  constructor(private securityService: SecurityService) {

  }

  @Input()
  role!: string;

  isAuthorized() {
    if (this.role) {
      return this.securityService.getRole() === this.role
    } else {
      return this.securityService.isLogged()
    }    
  }
}
