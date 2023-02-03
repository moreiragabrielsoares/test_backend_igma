import { Customers } from '@prisma/client';

type ICreateNewCustomerData = Omit<Customers, 'id' | 'createdAt'>;

export { ICreateNewCustomerData };
