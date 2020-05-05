import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../booking/shared/booking.service';
import { Booking } from '../../booking/shared/booking.model';

import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {

  bookings: Booking[];
  errors: any[] = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    const managedBookings = this.bookingService.getManagedBookings();

    managedBookings.subscribe((booking: Booking[]) => {
      this.bookings = booking;
    }, (errResponse: HttpErrorResponse) => {
      this.errors = errResponse.error.errors;
    });
  }
}
