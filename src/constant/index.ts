import * as dotenv from "dotenv";

dotenv.config();

export const SERVER_PORT = process.env.PORT;

export const TOKEN = process.env.TOKEN;

// export const LIMIT_ITEM = process.env.ITEM;

export const noAuthPath: any[] = [
  "/",
  "/api/v1/courses",
];
