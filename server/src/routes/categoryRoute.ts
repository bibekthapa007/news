import multer from 'multer';
import { Router } from 'express';
import { checkJwt } from 'middlewares/jwt';
import categoryController from 'controllers/categoryController';

const router = Router();

router
  .route('/')
  .get(categoryController.getCategoryList)
  .post(checkJwt, categoryController.createCategory);

router
  .route('/:category_id')
  .get(categoryController.getCategoryById)
  .put(checkJwt, categoryController.updateCategory)
  .delete(checkJwt, categoryController.deleteCategory);

export default router;
