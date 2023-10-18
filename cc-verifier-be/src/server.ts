import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';

import { ValidateEnv } from '@utils/validateEnv';
import { CardRoute } from './routes/cards.route';
import HealthRoute from './routes/health.route';

ValidateEnv();

const app = new App([
  new AuthRoute(),
  new UserRoute(),
  new CardRoute(),
  new HealthRoute()
]);

app.listen();
