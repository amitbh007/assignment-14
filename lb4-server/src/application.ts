import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {CrudRestComponent} from '@loopback/rest-crud';
import { PasswordHasherBinding, TokenServiceBindings, TokenServiceConstants, UserServiceBindings } from './keys';
import { MyuserService } from './services/user-service';
import { BcryptHasher } from './services/hasher.password.bcrypt';
// import { AuthenticationComponent } from '@loopback/authentication';
import {AuthenticationComponent, Strategies} from 'loopback4-authentication';
import { JWTAuthenticationComponent} from '@loopback/authentication-jwt';
import { PostgreDbDataSource } from './datasources';
import { LocalPasswordVerifyProvider } from './services/localPassowrdVerifyProvider';
import { JWTService } from './services/jwt-service';
import { BearerTokenVerifyProvider } from './services/bearerTokenVerifyProvider';

export {ApplicationConfig};

export class Lb4ServerApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.component(AuthenticationComponent);
    // Mount jwt component
    this.component(JWTAuthenticationComponent);
    // Bind datasource
    this.dataSource(PostgreDbDataSource);

    // Set up the custom sequence
    this.sequence(MySequence);

    this.bind(Strategies.Passport.LOCAL_PASSWORD_VERIFIER).toProvider(
      LocalPasswordVerifyProvider,
    );

    this.bind(Strategies.Passport.BEARER_TOKEN_VERIFIER).toProvider(
      BearerTokenVerifyProvider,
    );

    this.bind(PasswordHasherBinding.PASSWORD_HASHER).toClass(BcryptHasher);
    this.bind(PasswordHasherBinding.ROUNDS).to(10);
    this.bind(UserServiceBindings.USER_SERVICE).toClass(MyuserService);
    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(TokenServiceConstants.TOKEN_SECRET_VALUE);
    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
    this.component(CrudRestComponent);
  }
}
