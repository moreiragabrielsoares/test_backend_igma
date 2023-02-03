import JoiImport from 'joi';
import DateExtension from '@joi/date';
import { ICreateNewCustomerData } from '../types/customerTypes';
const joi = JoiImport.extend(DateExtension) as typeof JoiImport;

const createNewCustomerSchema = joi.object<ICreateNewCustomerData>({
  cpf: joi
    .string()
    .pattern(/(^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$)|(^[0-9]{11}$)/)
    .required(),
  name: joi.string().max(150),
  birthdate: joi.date().format('string').format('YYYY-MM-DD').less('now').required()
});
// Para facilitar a realização de testes manuais via Thunder Client foi adicionado .format('string') no schema acima

const getCustomerByCpfSchema = joi.object<Omit<ICreateNewCustomerData, 'birthdate' | 'name'>>({
  cpf: joi
    .string()
    .pattern(/(^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$)|(^[0-9]{11}$)/)
    .required()
});

export { createNewCustomerSchema, getCustomerByCpfSchema };
