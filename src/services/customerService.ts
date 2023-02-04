import { ICreateNewCustomerData } from '../types/customerTypes';
import * as customerRepository from '../repositories/customerRepository';
import { formatCpf } from '../utils/cpfHandler';

async function findCustomerCpf(customerCpf: string) {
  const customer = await customerRepository.getCustomerByCpf(formatCpf(customerCpf));
  if (!customer) {
    throw { type: 'not_found', message: 'This cpf is not registered' };
  }

  return customer;
}

async function registerNewCustomer(newCustomerData: ICreateNewCustomerData) {
  const customer = await customerRepository.getCustomerByCpf(formatCpf(newCustomerData.cpf));
  if (customer) {
    throw { type: 'conflict', message: 'This cpf is already registered' };
  }

  newCustomerData.cpf = formatCpf(newCustomerData.cpf);
  newCustomerData.birthdate = new Date(newCustomerData.birthdate);

  await customerRepository.registerNewCustomer(newCustomerData);

  return;
}

async function getAllCustomers() {
  const customers = await customerRepository.getAllCustomers();

  return customers;
}

export { registerNewCustomer, getAllCustomers, findCustomerCpf };
