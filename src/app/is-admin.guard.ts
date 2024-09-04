import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SecurityService } from './services/security.service';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const securityService = inject(SecurityService)
  const router = inject(Router)

  if(securityService.getRole() === 'admin') {
    return true;
  }
  router.navigate(["/login"])
  return false;
};
