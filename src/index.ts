import * as http from 'http';
import * as express from 'express';
import * as Middleware from './config/middleware/middleware';
import * as Router from './config/router';
import { errorMiddleware } from './config/middleware/errorHandler';

const app: express.Application = express();

Middleware.configure(app);
Router.init(app);
app.use(errorMiddleware);

app.set('port', process.env.PORT || 3000);
app.set('secret', process.env.SECRET);

const Server: http.Server = http.createServer(app);

Server.listen(app.get('port'), () => {
  console.log(`listening at http://localhost:${app.get('port')}`);
});

export default app;
