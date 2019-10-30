import mongoose from 'mongoose'

const Schema = mongoose.Schema
const directorySchema = new Schema({
  id: Number,
  name: String,
  level: Number,
  parent_directory_id: Number,
})

directorySchema.index({ id: 1 })
const Directory = mongoose.model('Directory', directorySchema)

export default Directory