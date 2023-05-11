import type { Schema } from "express-validator";

export const getCourses: Schema = {
  // skip: {
  //   in: "query",
  //   notEmpty: {
  //     bail: true,
  //     errorMessage: "skip must be required !",
  //   },
  //   isNumeric: {
  //     bail: true,
  //     errorMessage: "skip data type must be number !",
  //   },
  // },
  // take: {
  //   in: "query",
  //   notEmpty: {
  //     bail: true,
  //     errorMessage: "take must be required !",
  //   },
  //   isNumeric: {
  //     bail: true,
  //     errorMessage: "take data type must be number !",
  //   },
  // },
};

export const importCourse: Schema = {
  courseId: {
    in: "body",
    notEmpty: {
      bail: true,
      errorMessage: "skip must be required !",
    },
    isString: {
      bail: true,
      errorMessage: "courseId data type must be string !",
    },
  },
  contentMetadata: {
    in: "body",
    isObject: {
      bail: true,
      errorMessage: "contentMetadata data type must be objecxt !",
    },
  }
}
