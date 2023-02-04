import { Request, Response } from 'express';
import * as customerService from '../services/customerService';
import { ICreateNewCustomerData } from '../types/customerTypes';

async function registerNewCustomer(req: Request, res: Response) {
  const newCustomerData: ICreateNewCustomerData = req.body as ICreateNewCustomerData;

  await customerService.registerNewCustomer(newCustomerData);

  res.status(201).send('New customer registered!');
}

async function getCustomerByCpf(req: Request, res: Response) {
  const customerCpf = req.body as Omit<ICreateNewCustomerData, 'birthdate' | 'name'>;

  const customer = await customerService.findCustomerCpf(customerCpf.cpf);

  res.status(200).send(customer);
}

async function getAllCustomers(req: Request, res: Response) {
  const customers = await customerService.getAllCustomers();

  res.status(200).send(customers);
}

export { registerNewCustomer, getAllCustomers, getCustomerByCpf };
