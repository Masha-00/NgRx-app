const mongoose = require('mongoose');
const { Schema } = mongoose;

const Employee = new Schema({
  name: { type: String },
  email: { type: String },
  phoneNumber: { type: Number },
  level: { type: String },
  date: { type: Date }
}, { 
  collection: 'employees' 
})

module.exports = mongoose.model('Employee', Employee);