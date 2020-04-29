import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

  constructor() { }

  @Input() price: number;

  daterange: any = {};

  options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
    opens: 'left'
  };

  ngOnInit() {
  }

  selectedDate(value: any, datepicker?: any) {
    // this is the date the iser selected
    console.log(value);

    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;

    // or manupulat your own internal property
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }

}
