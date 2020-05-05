import { Component, OnInit } from '@angular/core';

import { RentalService } from '../../rental/shared/rental.service';
import { Rental } from '../../rental/shared/rental.model';
import { ToastrService } from 'ngx-toastr';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {

  rentals: Rental[];
  errors: any[] = [];
  rentalDeleteIndex: number;

  constructor(private rentalService: RentalService,
              private toastr: ToastrService) { }

  ngOnInit() {
    const managedRentals = this.rentalService.getManagedRentals();

    managedRentals.subscribe((rental: Rental[]) => {
      this.rentals = rental;
    }, (errResponse: HttpErrorResponse) => {
      this.errors = errResponse.error.errors;
    });
  }

  deleteRental(rentalId: string) {
    this.rentalService.deleteRentalById(rentalId).subscribe(
      () => {
       this.rentals.splice(this.rentalDeleteIndex, 1);
       this.rentalDeleteIndex = undefined;
       this.toastr.success('Rental deleted!', 'Success!');
      },
      (errResponse: HttpErrorResponse) => {
        this.toastr.error(errResponse.error.errors[0].detail, 'Failed!');
      }
    )
  }
}
