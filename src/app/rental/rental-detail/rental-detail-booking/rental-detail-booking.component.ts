import { Component, OnInit, Input, ViewContainerRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Booking } from '../../../booking/shared/booking.model';
import { BookingService } from '../../../booking/shared/booking.service';
import { HelperService } from '../../../common/service/helper.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { AuthService } from '../../../auth/shared/auth.service';
import * as moment from 'moment';
import { Rental } from '../../shared/rental.model';


@Component({

  encapsulation: ViewEncapsulation.None,
  selector: 'app-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

  @Input() rental: Rental;
  @ViewChild(DaterangePickerComponent, {static: false})
    private picker: DaterangePickerComponent;

  newBooking: Booking;
  modelRef: any;

  daterange: any = {};
  bookedOutDates: any[] = [];
  errors: any[] = [];

  options: any = {
    locale: { format: Booking.DATE_FORMAT },
    alwaysShowCalendars: false,
    opens: 'left',
    autoUpdateInput: false,
    isInvalidDate: this.checkInvalidDates.bind(this)
  };

  constructor(private helper: HelperService,
              private modelService: NgbModal,
              private bookingService: BookingService,
              private toastr: ToastrService,
              public auth: AuthService) { }

  ngOnInit() {
    this.newBooking = new Booking();
    this.getBookedOutDates();
  }

  private checkInvalidDates(date) {
    return this.bookedOutDates.includes(this.helper.formatBookingDate(date)) || date.diff(moment(), 'days') < 0;
  }

  private getBookedOutDates() {
    const bookings: Booking[] = this.rental.bookings;
    if (bookings && bookings.length > 0) {
      bookings.forEach((booking: Booking) => {
        const dateRange = this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...dateRange);
      });
    }
  }

  addNewBookedOutDates(bookingData: any) {
    const dateRange = this.helper.getBookingRangeOfDates(bookingData.startAt, bookingData.endAt);
    this.bookedOutDates.push(...dateRange);
  }

  private resetDatePicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }

  openConfirmationModel(content) {
    this.errors = [];
    this.modelRef = this.modelService.open(content);
  }

  confirmBooking() {
    this.newBooking.rental = this.rental;
    this.bookingService.createBooking(this.newBooking)
      .subscribe((bookingData: any) => {
        this.addNewBookedOutDates(bookingData);
        this.newBooking = new Booking();
        this.modelRef.close();
        this.resetDatePicker();
        this.toastr.success('Booking created successfully!', 'Success!');
      }, (errorResponse: any) => {
        this.errors = errorResponse.error.errors;
      });
  }

  selectedDate(value: any, datepicker?: any) {
    this.options.autoUpdateInput = true;
    this.newBooking.startAt = this.helper.formatBookingDate(value.start);
    this.newBooking.endAt = this.helper.formatBookingDate(value.end);
    this.newBooking.days = -(value.start.diff(value.end, 'days'));
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
  }

}
