import { ICreateNewCustomerData } from '../types/customerTypes';
import * as customerRepository from '../repositories/customerRepository';
import { formatCpf, validateCpf } from '../utils/cpfHandler';

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

  if (!validateCpf(newCustomerData.cpf)) {
    throw { type: 'unprocessable', message: 'This cpf is not valid' };
  }

  newCustomerData.birthdate = new Date(newCustomerData.birthdate);

  await customerRepository.registerNewCustomer(newCustomerData);

  return;
}

async function getAllCustomers() {
  const customers = await customerRepository.getAllCustomers();

  return customers;
}

async function getCustomersPaginated(page: number) {
  if (isNaN(page) || page === 0 || page % 1 !== 0) {
    throw { type: 'not_found', message: 'This page is not valid' };
  }

  const customers = await customerRepository.getCustomersPaginated(page);

  return customers;
}

export { registerNewCustomer, getAllCustomers, findCustomerCpf, getCustomersPaginated };
