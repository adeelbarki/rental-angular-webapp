import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

import { UcWordsPipe } from 'ngx-pipes';

import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-rental-update',
  templateUrl: './rental-update.component.html',
  styleUrls: ['./rental-update.component.scss']
})
export class RentalUpdateComponent implements OnInit {

  public rental: Rental;

  rentalCategories: string[] = Rental.CATEGORIES;
  locationSubject: Subject<any> = new Subject();

  errors: any[] = [];

  constructor(private route: ActivatedRoute,
              private upperCase: UcWordsPipe,
              private rentalService: RentalService,
              private toastr: ToastrService) {
                this.transformLocation = this.transformLocation.bind(this);
              }

  ngOnInit() {

    this.route.params.subscribe(
      (params) => {
        this.getRental(params.rentalId);
      });
  }

  transformLocation(location: string): string {
    return this.upperCase.transform(location);
  }

  getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId).subscribe(
      (rental: Rental) => {
        this.rental = rental;
      });
  }

  updateRental(rentalId: string, rentalData: any) {
    this.rentalService.updateRentalById(rentalId, rentalData).subscribe(
    (updatedRental: Rental) => {
      this.rental = updatedRental;

      // if (rentalData.city || rentalData.street) {
      //   this.locationSubject.next(this.rental.city + ', ' + this.rental.street);
      // }
    }, (errResponse: HttpErrorResponse) => {
      this.toastr.error(errResponse.error.errors[0].detail, 'Error');
      this.getRental(rentalId);
    });
  }

  parseInt(value) {
    return parseInt(value || 0, 10);
  }

}
