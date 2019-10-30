import mongoose from 'mongoose'

const Schema = mongoose.Schema

const adminSchema = new Schema({
    id: Number,
    username: String,
    password: String,
    create_time: String,
    avator: {type: String, default: 'default.jpg'}
})

adminSchema.index({id: 1})

const Admin = mongoose.model('Admin', adminSchema)

export default Admin