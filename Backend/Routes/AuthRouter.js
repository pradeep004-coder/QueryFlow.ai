import { signup, login }  from '../Controllers/AuthController.js';
import { signupValidation, loginValidation } from '../Middlewares/AuthValidation.js';

import { Router } from 'express';

const AuthRouter = Router();

AuthRouter.post('/login', loginValidation, login);
AuthRouter.post('/signup', signupValidation, signup);

export default AuthRouter;