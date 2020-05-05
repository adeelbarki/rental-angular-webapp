import { Rental } from '../../rental/shared/rental.model';
import { Booking } from '../../booking/shared/booking.model';

export class User {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  bookings: Booking[];
  rentals: Rental[];
}
