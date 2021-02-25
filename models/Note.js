import mongoose from 'mongoose';

const {String} = mongoose.Schema.Types;

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add something'],
        unique: true,
        trim: true,
        maxlength: [45, 'Title cannot be more than 45 characters']
    },
    description: {
        type: String,
        required: true,
        maxlength: [200, 'Description cannot be more than 200 characters']
    },
    author: {
        type: String,
        required: [true, 'Please provide an author name']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
})

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);