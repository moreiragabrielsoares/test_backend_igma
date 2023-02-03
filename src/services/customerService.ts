import { ICreateNewCustomerData } from '../types/customerTypes';
import * as customerRepository from '../repositories/customerRepository';
import { formatCpf } from '../utils/cpfHandler';

async function getCustomerByCpf(customerCpf: string) {
  customerCpf = formatCpf(customerCpf);

  const customer = customerRepository.getCustomerByCpf(customerCpf);

  return customer;
}

async function checkCustomerCpf(customerCpf: string) {
  const customer = await getCustomerByCpf(customerCpf);
  if (!customer) {
    throw { type: 'not_found', message: 'This cpf is not registered' };
  }

  return customer;
}

async function registerNewCustomer(newCustomerData: ICreateNewCustomerData) {
  const customer = await getCustomerByCpf(newCustomerData.cpf);
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

export { getCustomerByCpf, registerNewCustomer, getAllCustomers, checkCustomerCpf };
