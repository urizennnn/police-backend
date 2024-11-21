import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validationMiddleware<T>(type: new () => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(type, req.body);

    //@ts-ignore
    const errors = await validate(dtoObject);
    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors
          .map((err) => Object.values(err.constraints || {}))
          .flat(),
      });
    }

    req.body = dtoObject; // Update request body with transformed object
    next();
  };
}
