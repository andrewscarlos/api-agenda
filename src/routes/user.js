import { Router } from 'express';
import userController from '../controllers/User';
import loginReuired from '../middlewares/loginRequired';
const router =  new Router();

router.get('/',loginReuired, userController.index);
router.get('/:id', userController.show);

router.post('/', userController.create);
router.put('/',loginReuired, userController.update);
router.delete('/', loginReuired, userController.delete);

export default router;