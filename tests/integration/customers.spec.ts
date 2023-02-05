/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import supertest from 'supertest';
import { describe, expect, it, afterAll, beforeEach } from '@jest/globals';
import { app } from '../../src/app';
import { prisma } from '../../src/database/database';
import {
  insertNewCustomer,
  createValidNewCustomerBody,
  createValidNewCustomerBodyCase2,
  createInvalidNewCustomerBody,
  createInvalidNewCustomerBodyWithFirstCheckDigitInvalid,
  createInvalidNewCustomerBodyWithSecondCheckDigitInvalid
} from '../factories/customerFactory';

const server = supertest(app);

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE customers RESTART IDENTITY;`;
});

describe('GET /allCustomers', () => {
  it('it should return an array and 200', async () => {
    const result = await server.get('/allCustomers');

    expect(result.body).toBeInstanceOf(Array);
    expect(result.status).toEqual(200);
  });
});

describe('GET /customer', () => {
  it('given a valid customer cpf it should return an object and 200', async () => {
    const newCustomerInserted = await insertNewCustomer();

    // @ts-ignore: Object is possibly 'null'.
    const result = await server.get('/customer').send({ cpf: newCustomerInserted.cpf });

    expect(result.body).toBeInstanceOf(Object);
    expect(result.status).toEqual(200);
  });

  it('given a valid customer cpf but not registered it should return 404', async () => {
    const newCustomerBody = createValidNewCustomerBody();

    const result = await server.get('/customer').send({ cpf: newCustomerBody.cpf });

    expect(result.status).toEqual(404);
  });
});

describe('GET /customers?page', () => {
  it('given a valid page it should return array with max len=5 and 200', async () => {
    const page = 1;

    const result = await server.get(`/customers?page=${page}`);

    expect(result.body).toBeInstanceOf(Array);
    expect(result.status).toEqual(200);
    expect(result.body.length).toBeLessThanOrEqual(5);
  });

  it('given a invalid page it should return 404', async () => {
    const page = 'a';

    const result = await server.get(`/customers?page=${page}`);

    expect(result.status).toEqual(404);
  });
});

describe('POST /create-customers', () => {
  it('given a valid new customer body it should return 201', async () => {
    const newCustomerBody = createValidNewCustomerBody();

    const result = await supertest(app).post('/create-customer').send(newCustomerBody);

    const createdCustomer = await prisma.customers.findUnique({
      where: { cpf: newCustomerBody.cpf }
    });

    expect(result.status).toEqual(201);
    expect(createdCustomer).not.toBeNull();
  });

  it('given a valid new customer body it should return 201 - case 2', async () => {
    const newCustomerBody = createValidNewCustomerBodyCase2();

    const result = await supertest(app).post('/create-customer').send(newCustomerBody);

    const createdCustomer = await prisma.customers.findUnique({
      where: { cpf: newCustomerBody.cpf }
    });

    expect(result.status).toEqual(201);
    expect(createdCustomer).not.toBeNull();
  });

  it('given a duplicated cpf customer body it should return 409', async () => {
    const newCustomerInserted = await insertNewCustomer();
    const newDuplicatedCustomer = createValidNewCustomerBody();

    // @ts-ignore: Object is possibly 'null'.
    newDuplicatedCustomer.cpf = newCustomerInserted.cpf;

    const result = await supertest(app).post('/create-customer').send(newDuplicatedCustomer);

    expect(result.status).toEqual(409);
  });

  it('given a invalid new customer body it should return 422', async () => {
    const newInvalidNewCustomerBody = createInvalidNewCustomerBody();

    const result = await supertest(app).post('/create-customer').send(newInvalidNewCustomerBody);

    expect(result.status).toEqual(422);
  });

  it('given a invalid new customer cpf (with the first check digit invalid) it should return 422', async () => {
    const newInvalidCustomerBodyWithFirstCheckDigitInvalid = createInvalidNewCustomerBodyWithFirstCheckDigitInvalid();

    const result = await supertest(app).post('/create-customer').send(newInvalidCustomerBodyWithFirstCheckDigitInvalid);

    expect(result.status).toEqual(422);
  });

  it('given a invalid new customer cpf (with the second check digit invalid) it should return 422', async () => {
    const newInvalidCustomerBodyWithSecondCheckDigitInvalid = createInvalidNewCustomerBodyWithSecondCheckDigitInvalid();

    const result = await supertest(app)
      .post('/create-customer')
      .send(newInvalidCustomerBodyWithSecondCheckDigitInvalid);

    expect(result.status).toEqual(422);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
