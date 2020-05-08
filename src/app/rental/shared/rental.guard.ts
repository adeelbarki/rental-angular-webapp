import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { map, catchError } from 'rxjs/operators';
import { RentalService } from './rental.service';
import { Observable, of } from 'rxjs';


@Injectable()
export class RentalGuard implements CanActivate {

  constructor(  private rentalService: RentalService,
                private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    const rentalId = route.params.rentalId;
    return this.rentalService.verifyRentalUser(rentalId).pipe(map(() => {
      return true;
    })).pipe(catchError(() => {
      this.router.navigate(['/rentals']);
      return of(false);
    }));
  }
}
