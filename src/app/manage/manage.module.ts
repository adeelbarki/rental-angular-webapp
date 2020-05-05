import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPipesModule } from 'ngx-pipes';
import { FormatDatePipe } from '../common/pipes/format-date.pipes';

import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/shared/auth.guard';
import { RentalService } from '../rental/shared/rental.service';
import { BookingService } from '../booking/shared/booking.service';

import { ManageComponent } from './manage.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { ManageRentalComponent } from './manage-rental/manage-rental.component';
import { ManageRentalBookingsComponent } from './manage-rental/manage-rental-bookings/manage-rental-bookings.component';

const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
    children: [
      { path: 'bookings', component: ManageBookingComponent, canActivate: [AuthGuard] },
    { path: 'rentals', component: ManageRentalComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  declarations: [
    ManageBookingComponent,
    ManageRentalComponent,
    FormatDatePipe,
    ManageRentalBookingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgPipesModule
  ],
  providers: [
    RentalService,
    BookingService
  ],
})

export class ManageModule {

}

