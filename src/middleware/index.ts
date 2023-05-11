import { configStorage, validation_type } from '../helper/upload';
import { Request, Response, NextFunction } from 'express'
import customeError from '../helper/customeError';
import { TOKEN, noAuthPath } from "../constant";
import * as rfs from "rotating-file-stream";
import { expressjwt } from "express-jwt";
// import { decodeToken } from "../helper";
import { exit } from 'node:process';
import morgan from "morgan";
import multer from 'multer';


export const expressJWTMiddleware = expressjwt({
  secret: TOKEN as string,
  algorithms: ["HS256"],
}).unless({
  path: noAuthPath,
});

export const morganMiddleware = morgan("combined", {
  stream: rfs.createStream("activity.log", {
    interval: "1d",
    path: "log",
  }),
});

// export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userToken = await decodeToken(req.headers.authorization as string).catch(err => { throw new customeError("Invalid token or expired", 401, "UNAUTHORIZED", err) });

//       console.log({
//         message: "TOKEN DATA !",
//         data: userToken
//       })

//       req.body.token_data = userToken

//       next()
//     } catch (error) {
//       return res.status(401).json({
//         status: false,
//         message: "Invalid token or expired !!!",
//         statusCode: 'UNAUTHORIZED',
//       });
//     }
// }

export const checkApiKey = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { key } = req.headers
    const check_api_key = key == process.env.PUBLIC_API_KEY

    console.log({
      message: "CHECK API KEY",
      data: check_api_key
    })

    // req.body.token_data = userToken
    if (!check_api_key) {
      throw new customeError("API Key is Invalid !", 400, 'BAD REQUEST')
    }

    return next()
  } catch (error: any) {
    return res.status(error.code).json({
      status: false,
      message: error.message,
      statusCode: error.type,
    });
  }
}

export const uploadFile = (path: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const upload = multer({
      storage: configStorage(path),
      fileFilter: validation_type('rar'),
      limits: { fileSize: 100000000 }
    }).single('file');

    upload(req, res, (err: any) => {
      console.log(req.file)
      if (!req.file) {
        return res.status(400).json({
          status: false,
          message: 'file required',
          description: 'scorm zip file is required !',
        });
      } else if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.log(`ERROR WITH INSTANCEOF MULTER`)
        console.error(err.message)
        return res.status(400).json({
          status: false,
          message: err.message,
          description: "error with instanceof multer"
        });
      } else if (err) {
        // An unknown error occurred when uploading.
        console.log(`ERROR ANOTHER WITHOUT INSTANCEOF MULTER`)
        console.error(err)
        return res.status(400).json({
          status: false,
          message: err.message,
          description: "error another without instanceof multer"
          // errors: err
        });
      }
      next()
    })
  }
}
