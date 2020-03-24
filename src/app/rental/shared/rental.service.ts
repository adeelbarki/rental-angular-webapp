import { Injectable } from '@angular/core';

@Injectable()
export class RentalService {
  private rentals: any[] = [
    {
    id: 1,
    title: 'Central Apartment',
    city: 'Saint Johns',
    street: 'Main Blvd',
    category: 'whole condo',
    image: 'http://via.placeholder.com/350x250',
    bedroom: 3,
    description: 'A small nice apartment',
    dailyRate: 34,
    shared: false,
    createdAt: '10/09/2007'
  },
  {
    id: 2,
    title: 'Central Apartment',
    city: 'Corner Brook',
    street: 'Kentmount',
    category: 'whole apartment',
    image: 'http://via.placeholder.com/350x250',
    bedroom: 3,
    description: 'A small nice apartment',
    dailyRate: 28,
    shared: false,
    createdAt: '10/09/2007'
  },
  {
    id: 3,
    title: 'Whole Condo',
    city: 'Gander',
    street: 'Kentmount',
    category: 'whole apartment',
    image: 'http://via.placeholder.com/350x250',
    bedroom: 3,
    description: 'A small nice apartment',
    dailyRate: 25,
    shared: true,
    createdAt: '10/09/2007'
  },
  {
    id: 4,
    title: 'Central Apartment',
    city: 'Saint Johns',
    street: 'Kentmount',
    category: 'apartment',
    image: 'http://via.placeholder.com/350x250',
    bedroom: 3,
    description: 'A small nice apartment',
    dailyRate: 32,
    shared: false,
    createdAt: '10/09/2007'
  }
];

  public getRentals(): any[] {
    return this.rentals;
  }
}
