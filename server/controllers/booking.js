const { normalizeErrors } = require('../helpers/mongoose');
const moment = require('moment');
const Booking = require('../models/booking');
const Rental = require('../models/rental');
const User = require('../models/user');

exports.createBooking = function(req, res) {
  const { startAt, endAt, totalPrice, guests, days, rental } = req.body;
  const user = res.locals.user;

  const booking = new Booking({startAt, endAt, totalPrice, guests, days});

  Rental.findById(rental._id)
        .populate('bookings')
        .populate('user')
        .exec(function(err, foundRental){
          if(err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }

          if(foundRental.user.id === user.id) {
            return res.status(422).send({errors: [{title: 'Invalid User', detail: 'Cannot create booking on your own rentals'}]});
          }

          if (isValidBooking(booking, foundRental)) {
            booking.user = user;
            booking.rental = foundRental;
            foundRental.bookings.push(booking);

            booking.save(function(err) {
              if(err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)});
              }
              foundRental.save();
              User.updateOne({_id: user.id}, {$push: {bookings: booking}}, function(){});
              return res.json({startAt: booking.startAt, endAt: booking.endAt});
            });
          } else {
            return res.status(422).send({errors: [{title: 'Invalid Booking', detail: 'Already booked for selected dates'}]});
          }
        });
}

function isValidBooking(proposedBooking, rental) {
  let isValid = true;

  if (rental.bookings && rental.bookings.length > 0) {
    isValid = rental.bookings.every(function(booking) {
      const proposedStart = moment(proposedBooking.startAt);
      const proposedEnd = moment(proposedBooking.endAt);

      const confirmedStart = moment(booking.startAt);
      const confirmedEnd = moment(booking.endAt);

      return ((confirmedStart < proposedStart && confirmedEnd < proposedStart)
        || (proposedEnd < confirmedEnd && proposedEnd < confirmedStart));
    })
  }
  return isValid;
}
