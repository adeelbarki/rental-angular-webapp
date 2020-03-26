import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.module';

@Injectable()
export class RentalService {
  private rentals: Rental[] = [
    {
    id: '1',
    title: 'Central Apartment',
    city: 'Saint Johns',
    street: 'Main Blvd',
    category: 'whole condo',
    image: 'http://via.placeholder.com/350x250',
    bedrooms: 3,
    description: 'A small nice apartment',
    dailyRate: 34,
    shared: false,
    createdAt: '10/09/2007'
  },
  {
    id: '2',
    title: 'Central Apartment',
    city: 'Corner Brook',
    street: 'Kentmount',
    category: 'whole apartment',
    image: 'http://via.placeholder.com/350x250',
    bedrooms: 3,
    description: 'A small nice apartment',
    dailyRate: 28,
    shared: false,
    createdAt: '10/09/2007'
  },
  {
    id: '3',
    title: 'Whole Condo',
    city: 'Gander',
    street: 'Kentmount',
    category: 'whole apartment',
    image: 'http://via.placeholder.com/350x250',
    bedrooms: 3,
    description: 'A small nice apartment',
    dailyRate: 25,
    shared: true,
    createdAt: '10/09/2007'
  },
  {
    id: '4',
    title: 'Central Apartment',
    city: 'Saint Johns',
    street: 'Kentmount',
    category: 'apartment',
    image: 'http://via.placeholder.com/350x250',
    bedrooms: 3,
    description: 'A small nice apartment',
    dailyRate: 32,
    shared: false,
    createdAt: '10/09/2007'
  }
];

  public getRentalById(rentalId: string): Observable<Rental> {
    return new Observable<Rental>((observer) => {
      setTimeout(() => {
        const foundRental = this.rentals.find((rental) => {
          return rental.id = rentalId;
        });

        observer.next(foundRental);
      }, 500);
    })
  }

  public getRentals(): Observable<Rental[]> {
    return new Observable<Rental[]>(observer => {

      setTimeout(() => {
        observer.next(this.rentals);
      }, 1000);
    });
  }
}
