import { Router } from 'express';
import { validateSchema } from '../middlewares/schemaValidatorMiddleware';
import { createNewCustomerSchema, getCustomerByCpfSchema } from '../schemas/customerSchemas';
import * as customerController from '../controllers/customerController';

const customerRouter = Router();

customerRouter.post(
  '/create-customer',
  validateSchema(createNewCustomerSchema),
  customerController.registerNewCustomer
);
customerRouter.get('/customer', validateSchema(getCustomerByCpfSchema), customerController.getCustomerByCpf);
customerRouter.get('/allCustomers', customerController.getAllCustomers);
customerRouter.get('/customers', customerController.getCustomersPaginated);

export { customerRouter };
