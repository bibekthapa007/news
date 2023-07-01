import Joi, { boolean } from 'joi';
import { Request, Response, NextFunction } from 'express';

import User from 'models/UserModel';
import NotFoundError from 'errors/notFound';
import ValidationError from 'errors/validation';

async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.jwtPayload.id;

    const { error, value } = Joi.object({
      _id: Joi.string().required(),
      name: Joi.string(),
      role: Joi.string(),
      gender: Joi.string(),
      occupation: Joi.string(),
      viewSensitive: Joi.boolean(),
      viewPolitical: Joi.boolean(),
      imageLink: Joi.string().allow(null),
      releventCategories: Joi.array().items(Joi.string()),
    }).validate({ ...req.body, _id: userId });

    if (error) return next(new ValidationError(error.details[0].message));

    const user = await User.findOneAndUpdate({ _id: value._id }, value, { new: true });
    if (!user) return next(new NotFoundError('user not found'));

    return res.status(200).send({ message: 'user updated successfully.', user });
  } catch (error) {
    next(error);
  }
}

export default {
  updateUser,
};
