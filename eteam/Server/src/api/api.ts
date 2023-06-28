import * as express from 'express';
import * as fs from 'fs-extra';
import * as swaggerTools from 'swagger-tools';
import * as path from 'path';
import * as cors from 'cors';
import { Server } from 'http';
import { SocketCtrl } from './socket/main';
import * as https from 'https';

import * as session from 'express-session';
import * as cookie from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { SQLManager } from './managers/SQLManager';
import { LogManager } from './managers/LogManager';
import { CompanyAuthGuard, HrAuthGuard, InternalAuth } from './helpers/auth';
import { MailuManager } from './managers/MailuManager';
import { PlaceholderManager } from './managers/PlaceholderManager';
import { StartEmailType } from './classes/placeholders/StartEmailType';
import { RemindEmailType } from './classes/placeholders/RemindEmailType';
import { EndEmailType } from './classes/placeholders/EndEmailType';

import { MailManager } from './managers/MailManager';
import { RegistrationEmailType } from './classes/placeholders/RegistrationEmailType';
import { SubmitEmailType } from './classes/placeholders/SubmitEmailType';
import { RegistrationFailEmailType } from './classes/placeholders/RegistrationFailEmailType';
import { TableJobPositionsForms } from './models/dbTypes';
import { getColumnName } from '@wwwouter/typed-knex/dist/src/decorators';
import { NonstopRejectEmailType } from './classes/placeholders/NonstopRejectEmailType';
import { NonstopAcceptEmailType } from './classes/placeholders/NonstopAcceptEmailType';

export let SocketServer: SocketCtrl;

export const API = async (c) => {
  try {
    LogManager.log('Connecting to DB ..');
    SQLManager.getInstance();

    LogManager.log('Starting server ..');

    MailuManager.getInstance();
    MailManager.getInstance();

    PlaceholderManager.getInstance()
      .registerType(new StartEmailType())
      .registerType(new EndEmailType())
      .registerType(new RemindEmailType())
      .registerType(new RegistrationFailEmailType())
      .registerType(new SubmitEmailType())
      .registerType(new NonstopRejectEmailType())
      .registerType(new NonstopAcceptEmailType())
      .registerType(new RegistrationEmailType());

    const app = express();

    app.use(cookie());

    app.use(
      session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET,
        secure: false,
        cookie: { maxAge: 43200000, secure: false },
      })
    );

    app.use((req: any, res, next) => {
      req.cookies.lang = req.cookies.lang ? req.cookies.lang : 'en-SK';

      req.$localize = (
        msg: string,
        obj?: { [key: string]: string }
      ): string => {
        return $localize(msg, req.cookies.lang, obj);
      };

      console.log('[START] [MY TEST] [99] ' + Date.now());
      req.startTime = Date.now();
      res.on('finish', () => {
        console.log('[END] [MY TEST] [88] ' + Date.now());
        const dif = Date.now() - req.startTime;
        LogManager.log(
          req.method +
            ' | ' +
            req.session.userId +
            ': ' +
            req.originalUrl +
            ' (' +
            dif +
            'ms)'
        );
      });
      next();
    });

    app.use(
      cors({
        origin: [
          'http://codegen.localhost',
          'https://codegen.localhost',
          'http://192.168.0.9:4201',
          'http://192.168.0.9:4202',
          'https://192.168.0.9:4201',
          'https://192.168.0.9:4202',
          'http://192.168.31.253:4202',
          'https://192.168.31.253:4202',
          'http://192.168.31.253:4201',
          'http://fe.localhost',
          'http://db.localhost',
          'http://dbgui.localhost',
          'http://codegen.localhost',
          'http://fe.localhost',
          'http://fei.localhost',
          'http://feg.localhost',
          'http://fec.localhost',
          'http://localhost:4200',
          'http://localhost:4201',
          'http://localhost:4202',
          'http://hiroo.eu',
          'https://hiroo.eu',
          'https://www.hiroo.eu',
          'htts://www.hiroo.eu',
          'https://company.hiroo.eu/',
          'http://company.hiroo.eu/',
          'https://interview.hiroo.eu/',
          'http://interview.hiroo.eu/',
          'https://interview.hiroo.eu',
          'http://interview.hiroo.eu',
          /http(s)?:\/\/(.+\.)?hiroo\.eu/,
        ],
        credentials: true,
      })
    );

    const swaggerDocument = await fs.readFile(
      path.join(process.env.dirname, '../public/swagger.json')
    );
    const swaggerJson = JSON.parse(swaggerDocument.toString());

    const options = {
      controllers: path.join(process.env.dirname, 'api/controllers'),
      useStubs: true, // false in prod,
    };

    swaggerTools.initializeMiddleware(swaggerJson, (middleware) => {
      app.use(bodyParser.json({ limit: 10 * 1024 * 1024 * 1024 }));
      app.use(bodyParser.raw({ limit: 10 * 1024 * 1024 * 1024 }));

      app.use(middleware.swaggerMetadata());
      app.use(
        middleware.swaggerValidator({
          validateResponse: false,
        })
      );

      app.use(
        middleware.swaggerSecurity({
          CompanyAuthGuard,
          HrAuthGuard,
          InternalAuth,
        })
      );

      app.use(middleware.swaggerRouter(options));
      app.use(middleware.swaggerUi());

      app.use(
        '/public',
        express.static(path.join(process.env.dirname, '../public'))
      );

      app.use(
        '/public_tts',
        express.static(path.join(process.env.dirname, '../private/fm/tts'))
      );

      app.use((err, req, res, _next) => {
        if (err.isHandled === true) {
          return res.status(err.status).json({
            status: err.status,
            message: err.message,
          });
        } else {
          if (
            err.code === 'REQUIRED' ||
            err.code === 'SCHEMA_VALIDATION_FAILED'
          ) {
            console.log(JSON.stringify(err, null, 2));
            let errorMsg = req.$localize(
              ':errors - error 400@@so9ajLQ:Wrong info provided.'
            );

            let errorObj = err.results.errors ? err.results.errors[0] : null;
            if (!errorObj) {
              errorObj = err.results.warnings ? err.results.warnings[0] : null;
            }

            // TODO: Manage all errors
            if (errorObj) {
              if (errorObj.code === 'MAX_LENGTH') {
                errorMsg = req.$localize(
                  ":api - input errors@@soeSEte:The '{{inputType}}' must be shorter",
                  {
                    inputType: errorObj.path.join(' '),
                  }
                );
              } else if (errorObj.code === 'MIN_LENGTH') {
                errorMsg = req.$localize(
                  ":api - input errors@@soeSXCH:The '{{inputType}}' must be longer",
                  {
                    inputType: errorObj.path.join(' '),
                  }
                );
              } else if (errorObj.code === 'INVALID_TYPE') {
                errorMsg = req.$localize(
                  ":api - input errors@@soeTg3z:The '{{inputType}}' has incorrect type.",
                  {
                    inputType: errorObj.path.join(' '),
                  }
                );
              } else if (errorObj.code === 'OBJECT_MISSING_REQUIRED_PROPERTY') {
                errorMsg = req.$localize(
                  ":api - input errors@@soeThHX:The '{{inputType}}' is required.",
                  {
                    inputType: errorObj.message.split(': ')[1],
                  }
                );
              }
            }

            return res.status(400).json({
              status: 400,
              message: errorMsg, // err, errorMsg
            });
          }

          LogManager.warning(err);

          return res.status(500).json({
            status: 500,
            message: req.$localize(
              ':errors - error 500@@so9ajLQ:Unexpected server error.'
            ),
          });
        }
      });

      if (process.env.HIROOAPI_CERTKEY && process.env.HIROOAPI_CERT) {
        const httpsServer = https.createServer(
          {
            key: fs.readFileSync(process.env.HIROOAPI_CERTKEY),
            cert: fs.readFileSync(process.env.HIROOAPI_CERT),
          },
          app
        );

        SocketServer = new SocketCtrl(httpsServer);
        httpsServer.listen(process.env.PORT, () => {
          LogManager.success(
            'HTTPS/SSL Server started on port ' + process.env.PORT
          );
        });
      } else {
        const http = new Server(app);
        SocketServer = new SocketCtrl(http);
        http.listen(process.env.PORT, () => {
          LogManager.success('HTTP Server started on port ' + process.env.PORT);
        });
      }
    });
  } catch (exp) {
    LogManager.error('Cant start server');
    LogManager.error(exp);
  }
};
