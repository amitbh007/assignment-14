import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import {PostgreDbDataSource} from '../datasources';
import { PasswordHasherBinding } from '../keys';
import {User, UserRelations, Customer, Role} from '../models';
import { BcryptHasher } from '../services/hasher.password.bcrypt';
import {CustomerRepository} from './customer.repository';
import {RoleRepository} from './role.repository';

export type Credentials = {
  email?:any;
  password?: any;
}

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly customer: BelongsToAccessor<Customer, typeof User.prototype.id>;

  public readonly role: BelongsToAccessor<Role, typeof User.prototype.id>;

  constructor(
    @inject('datasources.postgreDb') dataSource: PostgreDbDataSource, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>, @repository.getter('RoleRepository') protected roleRepositoryGetter: Getter<RoleRepository>,
  ) {
    super(User, dataSource);
    this.role = this.createBelongsToAccessorFor('role', roleRepositoryGetter,);
    this.registerInclusionResolver('role', this.role.inclusionResolver);
    this.customer = this.createBelongsToAccessorFor('customer', customerRepositoryGetter,);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }

  
}
