import mongoose from 'mongoose'

const Schema = mongoose.Schema
const articleSchema =  new Schema({
    id: Number,
    title: String,
    content: String,
    tag: Array,
    createdAt: String,
    updatedAt: String,
    cover: String,
    isRelease: Boolean,
    dirId: Number
})

articleSchema.index({id: 1})
const Article = mongoose.model('Article', articleSchema)

export default Article