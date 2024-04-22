const express = require("express");
const router = express.Router();
const BookController = require('../controllers/productController');
const verifyUser = require('../middleware/authMiddleware');

router.get('/', BookController.ShowBooks);
router.get('/id/:_id', BookController.getById);
router.get('/genero/:genero', BookController.getGenero);
router.get('/titulo/:titulo', BookController.getTitle);
router.get('/relacionados', BookController.getRelacionados)
router.post('/create', BookController.create);
router.put('/edit/:_id', BookController.updateBook);
router.delete('/delete/:_id', BookController.deleteBook);

router.post('/createUser', BookController.createUser);
router.post('/leidos', BookController.leidos);
router.post('/pendientes', BookController.pendientes);
router.get('/leidos', BookController.getLeidos);
router.get('/pendientes', BookController.getPendientes);


module.exports = router;