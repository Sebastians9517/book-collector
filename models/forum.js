const mongoose = require('mongoose')
const Schema = mongoose.Schema


const forumSchema = new Schema({
  postedBy: String,
  avatar: String,
  title: String
}, {
  timestamps: true
})

module.exports = mongoose.model("Forum", forumSchema)
