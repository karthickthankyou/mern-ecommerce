const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

// Load env vars
dotenv.config()

// Load models
const Product = require('../models/Product')
const Order = require('../models/Order')
const User = require('../models/User')
const Review = require('../models/Review')

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

// Read JSON files
const Products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, 'utf-8')
)

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/orders.json`, 'utf-8')
)

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/users.json`, 'utf-8')
)

const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
)

// Import into DB
const importData = async () => {
  try {
    await Product.create(Products)
    await Course.create(courses)
    await User.create(users)
    await Review.create(reviews)
    console.log('Data Imported...'.green.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await Product.deleteMany()
    await Course.deleteMany()
    await User.deleteMany()
    await Review.deleteMany()
    console.log('Data Destroyed...'.red.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
