import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

function validateSchema(schema: joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(422).send(error.details.map((detail: joi.ValidationErrorItem) => detail.message));
    }

    next();
  };
}

export { validateSchema };
