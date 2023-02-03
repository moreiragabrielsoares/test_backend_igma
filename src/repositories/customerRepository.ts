import { prisma } from '../database/database';
import { ICreateNewCustomerData } from '../types/customerTypes';

async function registerNewCustomer(newCustomerData: ICreateNewCustomerData) {
  await prisma.customers.create({
    data: newCustomerData
  });
}

async function getCustomerByCpf(cpf: string) {
  return prisma.customers.findUnique({
    where: { cpf }
  });
}

async function getAllCustomers() {
  return prisma.customers.findMany();
}

export { registerNewCustomer, getCustomerByCpf, getAllCustomers };
