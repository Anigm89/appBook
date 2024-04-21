const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'Introduce el titulo del libro'],
    },
    subtitulo: String,
    autor: {
        type: String,
        required: [true, 'Introduce el autor del libro'],
    },
    sinopsis: String,
    imagen: String,
    paginas: Number,
    genero: [String],
    keywords: [String],
   
}, {Timestamps: true});

const Book = mongoose.model('appBook', BooksSchema)

module.exports = Book;