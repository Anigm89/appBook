const Book = require('../models/Book');

const BookController = {
    async ShowBooks (req, res) {
        try{
            const book = await Book.find();
            res.json(book)
        }
        catch(error){
            console.log(error)
        }
    },
    async getById(req, res) {
        try {
            const id = req.params._id;
            const bookId = await Book.findById(id);
            res.json(bookId)
        } catch (error) {
            console.log(error)
        }
    },
    async getGenero(req, res){
        try {
            const genero = req.params.genero;
            const books = await Book.find({genero: genero});
            res.json(books)
        } catch (error) {
            console.log(error)
        }
    },
    async getTitle(req, res) {
        try {
            await Book.collection.createIndex({ titulo: "text" }); 
            const title = req.params.titulo; 
            const books = await Book.find({ $text: { $search: title, $caseSensitive: false } });
            res.json(books);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },    
    async getRelacionados(req, res){
        try {
            const { genero, autor, keywords } = req.body;
            
            const searchQuery = {
                $or: [
                    { genero: { $in: genero } }, 
                    { autor: autor }, 
                    { keywords: { $in: keywords } } 
                ]
            };

            const relacionados = await Book.find(searchQuery);
            res.json(relacionados);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al buscar libros relacionados" });
        }
    },    
    async create (req, res){
        try{
            const newBook = await Book.create(req.body)
            res.status(201).send(newBook)
        }
        catch(error){
            console.log(error)
        }
    },
    async updateBook (req, res){
        try{
            const updateBook = await Book.findByIdAndUpdate(req.params._id,{
                titulo: req.body.titulo,
                subtitulo: req.body.subtitulo,
                autor: req.body.autor,
                sinopsis: req.body.sinopsis,
                imagen: req.body.imagen,
                paginas: req.body.paginas,
                genero: req.body.genero,
                keywords: req.body.keywords
            }, { new: true });
            if(!updateBook) {
                return res.status(404).json({ mensaje: 'No se ha podido actualizar' })
              } 
            res.status(201).json(updateBook)
        }
        catch(error){
            console.log(error)
        }  
    },
    async deleteBook(req, res){
        try{
            const deletebook = await Book.findByIdAndDelete(req.params._id)
        if(!deletebook){
            return res.status(404).json({ mensaje: "Libro no encontrado" });
        }
        res.status(200).json({ mensaje: "Libro eliminado con éxito: ", deletebook })
        }
        catch(error){
            console.log(error)
        }          
    }

}

module.exports = BookController;
