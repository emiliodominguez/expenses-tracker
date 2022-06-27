import { container } from '@app/config';
import { Services } from './services.enum';
import HttpService from './http.service';
import UsersService from './users.service';
import AccountsService from './accounts.service';

container.bind<HttpService>(Services.HttpService).to(HttpService).inSingletonScope();
container.bind<UsersService>(Services.UsersService).to(UsersService).inSingletonScope();
container.bind<AccountsService>(Services.AccountsService).to(AccountsService).inSingletonScope();
