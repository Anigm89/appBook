const express = require("express");
const router = express.Router();
const BookController = require('../controllers/productController');
const verifyUser = require('../middleware/authMiddleware');

router.get('/', BookController.ShowBooks);
router.get('/id/:_id', BookController.getById);
router.get('/genero/:genero', BookController.getGenero);
router.get('/titulo/:titulo', BookController.getTitle);
router.get('/relacionados', BookController.getRelacionados)
router.post('/create',verifyUser, BookController.create);
router.put('/edit/:id', verifyUser, BookController.updateBook);
router.delete('/delete/:id', verifyUser, BookController.deleteBook);

router.post('/createUser', BookController.createUser);
router.post('/leidos/', BookController.leidos);
router.post('/pendientes', verifyUser, BookController.pendientes);
router.get('/leidos/:uid', BookController.getLeidos);
router.get('/pendientes/:uid', BookController.getPendientes);
router.delete('/deletePendiente/:id_libro/:uid', BookController.deletePendiente)
router.delete('/deleteLeido/:id_libro/:uid', verifyUser, BookController.deleteLeido)


module.exports = router;