const Book = require('../models/Book');
const db = require('../config/config');

const BookController = {
    async ShowBooks (req, res) {
        try{
            const connection = await db()
            const [books] = await connection.query('SELECT * FROM libros');
            res.json(books)
        }
        catch(error){
            console.log(error)
        }
    },
    async getById(req, res) {
        try {
            const id = req.params._id;
            const connection = await db();
            const [bookId] = await connection.query(`SELECT * FROM libros where id = ${id}`);
            res.json(bookId[0])
        } catch (error) {
            console.log(error)
        }
    },
    async getGenero(req, res){
        try {
            const genero = req.params.genero;
            const connection = await db();
            const [books] = await connection.query(`SELECT * FROM libros WHERE genero like '%${genero}%'`);
            res.json([books])
        } catch (error) {
            console.log(error)
        }
    },
    async getTitle(req, res) {
        try {
            const title = req.params.titulo;
            const connection = await db();
            const [titles] = await connection.query(`SELECT * FROM libros WHERE titulo like '%${title}%'`);
            res.json([titles])
        } catch (error) {
            console.log(error)
        }
    },    
    async getRelacionados(req, res){
        try {
            const { genero, autor, keywords } = req.body;

            const connection = await db();
            const searchQuery = `SELECT * FROM libros WHERE genero LIKE '%${genero}%' or autor LIKE '%${autor}%' or keywords like '%${keywords}%'`
            const relacionados = await connection.query(searchQuery);
            res.json(relacionados);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al buscar libros relacionados" });
        }
    },    
    async create (req, res){
        try{
            const {titulo, subtitulo, autor, sinopsis, imagen, paginas, genero, keywords} = req.body;
            const connection = await db();
            const insertQuery = `INSERT INTO libros (titulo, subtitulo, autor, sinopsis, imagen, paginas, genero, keywords) 
                                VALUES ("${titulo}" ,"${subtitulo}","${autor}","${sinopsis}","${imagen}","${paginas}","${genero}","${keywords}")`;
            const newBook = await connection.query(insertQuery)
            res.status(201).send(newBook)
        }
        catch(error){
            console.log(error)
            res.status(500).json({ message: "Error creating book" });
        }
    },
   
    async updateBook (req, res){
        try{
            const id = req.params._id;
            const {titulo, subtitulo, autor, sinopsis, imagen, paginas, genero, keywords} = req.body;
            const connection = await db();
            const updateQuery = `UPDATE libros SET titulo ='${titulo}', subtitulo='${subtitulo}',autor='${autor}',sinopsis='${sinopsis}',imagen='${imagen}',paginas='${paginas}',genero='${genero}',keywords='${keywords}' WHERE id = ${id}`;
            const updateBook = await connection.query(updateQuery)
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
            const id = req.params._id;
            const connection = await db();
            const deleteQuery = `DELETE FROM libros WHERE id = ${id} `;
            const deletebook = await connection.query(deleteQuery)
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
