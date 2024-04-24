//const db = require('../config/config');
const pool = require('../config/config');

const BookController = {
    async ShowBooks (req, res) {
        try{
            //const connection = await db()
            const [books] = await pool.query('SELECT * FROM libros');
            res.json(books)
        }
        catch(error){
            console.log(error)
        }
    },
    async getById(req, res) {
        try {
            const id = req.params.id;
            const [bookId] = await pool.query(`SELECT * FROM libros where id = ${id}`);
            res.json(bookId[0])
        } catch (error) {
            console.log(error)
        }
    },
    async getGenero(req, res){
        try {
            const genero = req.params.genero;
            const [books] = await pool.query(`SELECT * FROM libros WHERE genero like '%${genero}%'`);
            res.json([books])
        } catch (error) {
            console.log(error)
        }
    },
    async getTitle(req, res) {
        try {
            const title = req.params.titulo;
            const [titles] = await pool.query(`SELECT * FROM libros WHERE titulo like '%${title}%'`);
            res.json([titles])
        } catch (error) {
            console.log(error)
        }
    },    
    async getRelacionados(req, res){
        try {
            const { genero, autor, keywords } = req.body;

            const searchQuery = `SELECT * FROM libros WHERE genero LIKE '%${genero}%' or autor LIKE '%${autor}%' or keywords like '%${keywords}%'`
            const relacionados = await pool.query(searchQuery);
            res.json(relacionados);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al buscar libros relacionados" });
        }
    },    
    async create (req, res){
        try{
            const {titulo, subtitulo, autor, sinopsis, imagen, paginas, genero, keywords} = req.body;
            const insertQuery = `INSERT INTO libros (titulo, subtitulo, autor, sinopsis, imagen, paginas, genero, keywords) 
                                VALUES ("${titulo}" ,"${subtitulo}","${autor}","${sinopsis}","${imagen}","${paginas}","${genero}","${keywords}")`;
            const newBook = await pool.query(insertQuery)
            res.status(201).send(newBook)
        }
        catch(error){
            console.log(error)
            res.status(500).json({ message: "Error creating book" });
        }
    },
   
    async updateBook (req, res){
        try{
            const id = req.params.id;
            const {titulo, subtitulo, autor, sinopsis, imagen, paginas, genero, keywords} = req.body;
            const updateQuery = `UPDATE libros SET titulo ='${titulo}', subtitulo='${subtitulo}',autor='${autor}',sinopsis='${sinopsis}',imagen='${imagen}',paginas='${paginas}',genero='${genero}',keywords='${keywords}' WHERE id = '${id}'`;
            const updateBook = await pool.query(updateQuery)
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
            const id = req.params.id;
            const deleteQuery = `DELETE FROM libros WHERE id = ${id} `;
            const deletebook = await pool.query(deleteQuery)
        if(!deletebook){
            return res.status(404).json({ mensaje: "Libro no encontrado" });
        }
        res.status(200).json({ mensaje: "Libro eliminado con éxito: ", deletebook })
        }
        catch(error){
            console.log(error)
        }          
    },
    async createUser (req, res){
        try{
            const {email, uid} = req.body;
            const insertQuery = `INSERT INTO usuarios (email, uid) VALUES ("${email}", "${uid}")`;
            const newUser = await pool.query(insertQuery)
            if (!newUser) {
                console.log('Error al insertar el email en la base de datos:', error);
                res.status(500).send('Error al guardar el email en la base de datos');
            } else {
                console.log('Email guardado en la base de datos:', email);
                res.status(201).send('Email guardado correctamente');
            }
        }
        catch(error){
            console.log(error)
            res.status(500).json({ message: "Error creating user" });
        }
    },
    async leidos (req, res){
        try{
            const {id_libro, uid} = req.body;
            const insertQuery = `INSERT INTO leidos (id_libro, uid) VALUES ("${id_libro}", "${uid}")`;
            const leido = await pool.query(insertQuery)
            if (!leido) {
                console.log('Error al insertar el libro en la tabla leidos:', error);
                res.status(500).send('Error al guardar el libro como leido en la base de datos');
            } else {
                console.log('libro guardado en la base de datos');
                res.status(201).send('añadido como leido correctamente');
            }
        }
        catch(error){
            console.log(error)
            res.status(500).json({ message: "Error al marcar como leido" });
        }
    },
    async pendientes (req, res){
        try{
            const {id_libro, uid, actualizar} = req.body;
            
            if (actualizar) {
               
                const deleteQuery = `DELETE FROM pendientes WHERE id_libro = "${id_libro}" AND uid = "${uid}"`;
                await pool.query(deleteQuery);
    
                const insertQuery = `INSERT INTO leidos (id_libro, uid) VALUES ("${id_libro}", "${uid}")`;
                await pool.query(insertQuery);
    
                res.status(200).send('Libro movido de pendientes a leídos correctamente');
            } 
            else{
                const insertQuery = `INSERT INTO pendientes (id_libro, uid) VALUES ("${id_libro}", "${uid}")`;
                const pendientes = await pool.query(insertQuery);

                if (!pendientes) {
                    console.log('Error al insertar el libro en la tabla por leer:', error);
                    res.status(500).send('Error al guardar el libro como pendiente en la base de datos');
                } else {
                    console.log('libro guardado en la base de datos');
                    res.status(201).send('añadido como pendiente correctamente');
                }
            }
        }
        catch(error){
            console.log(error)
            res.status(500).json({ message: "Error al marcar como pendiente" });
        }
    },
    async getLeidos (req, res) {
        try{
            const { uid } = req.body;
            const [books] = await pool.query(`SELECT * FROM leidos WHERE uid = '${uid}'`);
            res.json(books)
        }
        catch(error){
            console.log(error)
        }
    },

    async getPendientes (req, res) {
        try{
            const { uid } = req.body;
            const [books] = await pool.query(`SELECT * FROM pendientes WHERE uid = '${uid}'`);
            res.json(books)
        }
        catch(error){
            console.log(error)
        }
    }
}

module.exports = BookController;
