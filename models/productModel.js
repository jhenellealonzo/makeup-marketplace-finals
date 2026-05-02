const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product must have a name'],
    unique: true
  },
  price: {
    type: Number,
    required: [true, 'Product must have a price'],
    min: [0, 'Product price must be above 0']
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        return val < this.price;
      },
      message: 'Discount price {{VALUE}} should be below regular price'
    }
  },
  category: {
    type: String,
    required: [true, 'Product must have a category']
  },
  description: {
    type: String,
    required: [true, 'Product must have a description'],
    trim: true,
    maxLength: [50, 'Product description must be less than or equal to 50 characters'],
    minLength: [10, 'Product description must be more than or equal to 10 characters'],
  },
  seller: {
    type: String,
    required: [true, 'Product must have a seller']
  },
  postedDate: {
    type: Date,
    required: [true, 'Product must have a posted date']
  },
  productSlug: {
    type: String,
    unique: true
  },
  premiumProducts: {
    type: Boolean,
    default: false,
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});
productSchema.virtual('daysPosted').get(function () {
  return Math.floor((Date.now() - this.postedDate) / (1000 * 60 * 60 * 24));
});
productSchema.pre('save', function () {
  this.productSlug = slugify(this.name).toUpperCase();
})
productSchema.post('save', function (doc) {
  console.log(doc);
});

productSchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { premiumProducts: { $ne: true } } });
});

productSchema.pre(/^find/, function () {
  this.find({ premiumProducts: { $ne: true } });
  this.start = Date.now();
});
productSchema.post(/^find/, function (docs) {
  console.log(`Query took ${Date.now() -
    this.start} milliseconds!`);
  console.log(docs);
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;