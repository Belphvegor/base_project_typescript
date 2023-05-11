import axios, { toFormData } from "axios";
import { v4 as uuidv4 } from "uuid"
import { prisma } from "../config";
import FormData from 'form-data';
import base64 from "base-64";
import moment from "moment";
import http from "http"; //
import os from "os";
import fs from 'fs';


const keepAliveAgent = {
  maxSockets: os.cpus().length,
  maxFreeSockets: os.cpus().length,
  timeout: 10 * 60000,
  freeSocketTimeout: 10 * 60000,
  keepAliveMsecs: 10 * 60000,
  keepAlive: true,
};

const instance = axios.create({
  baseURL: 'https://cloud.scorm.com/api',
  withCredentials: true,
  headers: {
    accept: 'application/json',
    authorization:  `Basic ${base64.encode(`${process.env.DEV_USER_SCORM}:${process.env.DEV_PASSWORD_SCORM}`)}`
  },
  httpAgent: new http.Agent(keepAliveAgent),
  timeout: 10 * 60000,
});

export const getCourses = async (_params: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const courses = await instance({
        method: "GET",
        url: "/v2/courses",
        params: _params,
      }).then((res) => res.data).catch((err) => { throw err });

      resolve(courses);
    } catch (error) {
      console.trace(error);
      reject(error);
    }
  });
};

export const importCourse = async (body: any, file: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let _params = { courseId: uuidv4() }
      let meta_data = JSON.stringify(body.contentMetadata)

      const form = new FormData();
      form.append('contentMetadata', meta_data);
      form.append('file', fs.createReadStream(file.path));

      const import_courses = await instance({
        method: "POST",
        url: "/v2/courses/importJobs/upload",
        params: _params,
        data: form
      }).then((res) => res.data).catch((err) => { throw err });

      if (import_courses.hasOwnProperty('result')) {
        let importJobId = import_courses.result
        let status_import = "RUNNING"
        let result

        while (status_import === 'RUNNING') {
          const import_status = await instance({
            method: "GET",
            url: `/v2/courses/importJobs/${importJobId}`,
          }).then((res) => res.data).catch((err) => { throw err });
          console.log({
            message: "IMPORT ONPROSES !",
            data: import_status
          })

          if(import_status.status !== 'RUNNING') {
            status_import = import_status.status
            result = import_status
          }
        }
        resolve(result)
      }
    } catch (error) {
      console.trace(error);
      reject(error);
    }
  });
};
