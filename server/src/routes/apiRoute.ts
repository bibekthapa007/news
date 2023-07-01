import { Router } from 'express';
import UserRoute from 'routes/userRoute';
import AuthRoute from 'routes/authRoute';
import PostRoute from 'routes/postRoute';
import { checkJwt } from 'middlewares/jwt';
import CategoryRoute from 'routes/categoryRoute';

const router = Router();

router.use('/auth', AuthRoute);
router.use('/category', CategoryRoute);
router.use('/post', PostRoute);
router.use('/user', UserRoute);

router.get('/', (req, res) => res.status(200).send('<h1>Sojo News App Api</h1>'));

router.get('*', (req, res) => {
  return res.status(404).send({ message: 'api not found.' });
});

export default router;
