import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Customer} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Customer,
  pattern: 'CrudRest',
  dataSource: 'postgreDb',
  basePath: '/customers',
};
module.exports = config;
