import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Rental } from '../shared/rental.model';

import { RentalService } from '../shared/rental.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {

  newRental: Rental;
  rentalCategories = Rental.CATEGORIES;
  errors: any[] = [];

  constructor(private rentalService: RentalService,
              private router: Router) { }

  handleImageChange() {
    this.newRental.image = 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg';
  }

  ngOnInit() {
    this.newRental = new Rental();
    this.newRental.shared = false;
  }

  createRental() {
    this.rentalService.createRental(this.newRental)
        .subscribe((rental: Rental) => {
          this.router.navigate([`/rentals/${rental._id}`]);
        }, (errorResponse: HttpErrorResponse) => {
          this.errors = errorResponse.error.errors;
        });
  }

  handleImageUpload(imageUrl: string) {
    this.newRental.image = imageUrl;
  }

  handleImageError($event) {
    this.newRental.image = '';
  }

}
