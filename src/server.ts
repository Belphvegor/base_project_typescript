import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express from "express";
import cron from "node-cron";
import moment from "moment";
import helmet from "helmet";
import cors from "cors";

import { expressJWTMiddleware, morganMiddleware } from "./middleware";
import { SERVER_PORT } from "./constant";
import { corsConfig } from "./config";
import rootRoutes from "./routes";

async function main() {
  const current_datetime = moment().utc().format();
  const app = express();
  dotenv.config();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));
  app.use(cors(corsConfig));
  app.use(cookieParser());
  app.use(expressJWTMiddleware);
  app.use(morganMiddleware);
  app.use(helmet());

  app.use(rootRoutes);

  //   cron.schedule('*/2 * * * *', async () => {
  //     const login = await loginBOSRetail().catch(err => { throw err })
  //     if (login) {
  //       console.log('berhasil login ke retail !')
  //     } else {
  //       console.log('gagal login ke retail !')
  //     }
  //   })

  app.use(function (err: any, req: any, res: any, next: any) {
    if (err.name === "UnauthorizedError") {
      res.status(401).json({
        status: false,
        message: "Invalid token or expired",
        statusCode: "UNAUTHORIZED",
      });
    } else {
      next(err);
    }
  });

  app.listen(SERVER_PORT, () => {
    console.log(`Server Up and Running at:${SERVER_PORT}`);
  });
}

main().catch((e) => {
  console.log(e);
});
