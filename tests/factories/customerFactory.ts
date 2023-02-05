import { prisma } from '../../src/database/database';

function createValidNewCustomerBody() {
  const newValidCustomerBody = {
    name: 'Gabriel',
    cpf: '11111111111',
    birthdate: '2000-02-04'
  };

  return newValidCustomerBody;
}

function createValidNewCustomerBodyCase2() {
  const newValidCustomerBody = {
    name: 'Gabriel',
    cpf: '12026390703',
    birthdate: '2000-02-04'
  };

  return newValidCustomerBody;
}

function createInvalidNewCustomerBody() {
  const newInvalidCustomerBody = {
    name: 'Gabriel',
    cpf: '111',
    birthdate: '2000-02-04'
  };

  return newInvalidCustomerBody;
}

function createInvalidNewCustomerBodyWithFirstCheckDigitInvalid() {
  const newInvalidCustomerBodyWithFirstCheckDigitInvalid = {
    name: 'Gabriel',
    cpf: '11111111101',
    birthdate: '2000-02-04'
  };

  return newInvalidCustomerBodyWithFirstCheckDigitInvalid;
}

function createInvalidNewCustomerBodyWithSecondCheckDigitInvalid() {
  const newInvalidCustomerBodyWithSecondCheckDigitInvalid = {
    name: 'Gabriel',
    cpf: '11111111110',
    birthdate: '2000-02-04'
  };

  return newInvalidCustomerBodyWithSecondCheckDigitInvalid;
}

function createValidNewCustomer() {
  const newValidCustomer = {
    name: 'Gabriel',
    cpf: '11111111111',
    birthdate: '2000-02-04T00:00:00.000Z'
  };

  return newValidCustomer;
}

async function insertNewCustomer() {
  const newCustomer = createValidNewCustomer();

  await prisma.customers.create({
    data: newCustomer
  });

  const insertedNewCustomer = await prisma.customers.findUnique({
    where: { cpf: newCustomer.cpf }
  });

  return insertedNewCustomer;
}

export {
  createValidNewCustomer,
  insertNewCustomer,
  createValidNewCustomerBody,
  createValidNewCustomerBodyCase2,
  createInvalidNewCustomerBody,
  createInvalidNewCustomerBodyWithFirstCheckDigitInvalid,
  createInvalidNewCustomerBodyWithSecondCheckDigitInvalid
};
