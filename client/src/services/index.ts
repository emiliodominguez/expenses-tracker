import { container } from '@app/config';
import { Services } from './services.enum';
import HttpService from './http.service';
import UsersService from './users.service';
import AccountsService from './accounts.service';
import CardsService from './cards.service';
import MovementsService from './movements.service';
import CalendarService from './calendar.service';

container.bind<HttpService>(Services.HttpService).to(HttpService).inSingletonScope();
container.bind<UsersService>(Services.UsersService).to(UsersService).inSingletonScope();
container.bind<AccountsService>(Services.AccountsService).to(AccountsService).inSingletonScope();
container.bind<CardsService>(Services.CardsService).to(CardsService).inSingletonScope();
container.bind<MovementsService>(Services.MovementsService).to(MovementsService).inSingletonScope();
container.bind<CalendarService>(Services.CalendarService).to(CalendarService).inSingletonScope();
