const Router = require('express');
const router = new Router();
const foodController = require('../controllers/foodController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN') , foodController.create);
router.get('/', foodController.getAll);


module.exports = router;