const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: [4, 'Too short, min 4 characters'],
    max:[32, 'Too long, max 32 characters']
  },
  email: {
    type: String,
    required: 'Email is required',
    min: [4, 'Too short, min 4 characters'],
    max:[32, 'Too long, max 32 characters'],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    required: 'Password is required',
    min: [4, 'Too short, min 4 characters'],
    max:[32, 'Too long, max 32 characters']
  },
  rentals: [{type: Schema.Types.ObjectId, ref:'Rental'}],
  bookings: [{type: Schema.Types.ObjectId, ref:'Booking'}]
});

userSchema.methods.hasSamePassword = function(requestedPassword) {
  return bcrypt.compareSync(requestedPassword, this.password);
}

userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    })
  })
})

module.exports = mongoose.model('User', userSchema)
