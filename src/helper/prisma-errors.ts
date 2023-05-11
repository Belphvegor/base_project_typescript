import { Prisma } from '@prisma/client'

export const handleError = (error: any) => {
  switch (true) {
    case error instanceof Prisma.PrismaClientKnownRequestError:
      console.error(`Known request error: ${error.message}`);
      console.error(`Query: ${error.meta?.cause?.query ?? "Unknown"}`);
      break;

    case error instanceof Prisma.PrismaClientInitializationError:
      console.error(`Initialization error: ${error.message}`);
      break;

    case error instanceof Prisma.PrismaClientValidationError:
      console.error(`Validation error: ${error.message}`);
      console.error(`Version: ${error.clientVersion}`);
      break;

    case error instanceof Prisma.PrismaClientRustPanicError:
      console.error(`Rust panic error: ${error.message}`);
      console.error(`Stack trace: ${error.stack}`);
      break;

    case error instanceof Prisma.PrismaClientUnknownRequestError:
      console.error(`Unknown error: ${error.message}`);
      console.error(`Stack trace: ${error.stack}`);
      break;

    default:
      console.error(`Unexpected error: ${error}`);
      // console.error(`Stack trace: ${error.stack}`);
      break;
  }
};
