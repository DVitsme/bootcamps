const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxLength: [50, 'Name can not be more than 50 characters'],
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a descripition'],
    maxLength: [500, 'Description cannot be longer than 500 characters'],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS',
    ],
  },
  phone: {
    type: String,
    maxLength: [20, 'Please enter a phone number less than 20 characters'],
  },
  email: {
    type: String,
    match: [/^\S+@\S+$/, 'Please enter a valid email'],
  },
  address: {
    type: String,
    required: [true, 'Please enter a address'],
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipCode: Number,
    country: String,
  },
  carrers: {
    type: [String],
    required: true,
    enum: [
      'Web Developer',
      'Mobile Developer',
      'UI/UX',
      'Data Science',
      'Business',
      'Photographer',
      'Other',
    ],
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be atleast 1'],
    max: [10, 'Rating must be atleast 10'],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistane: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Setup Slug
BootcampSchema.pre('save', function (next) {
  this.slug = slugify(this.slug, { lower: true });
  next();
});

// Geocoder - create location feild
BootcampSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].state,
    zipCode: loc[0].zipcode,
    country: loc[0].countryCode,
  };

  this.address = undefined;
  next();
});

module.exports = mongoose.model('Bootcamp', BootcampSchema);
