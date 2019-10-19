/**
 * @Author: kun
 */

import { createApplication } from 'application';
import * as koaLogger from 'koa-logger';
import config from './config';
import * as router from './router';
import { NODE_ENV } from '../../utils/enums';
import getLogger from '../../utils/log4js';
import errorHandle from '../../middleware/error-handle';


async function main() {
  const app = await createApplication(__dirname, Object.keys(router).map(k => router[k]), {
    logger: getLogger('app'),
  });

  if (config.env === NODE_ENV.dev) {
    app.use(koaLogger());
  }

  app.use(errorHandle());

  app.listen(config.port);
}

main();
