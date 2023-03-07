import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../customError/CustomError";
import { generalError, notFoundError } from "./errorMiddleware";

const req = {} as Request;
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as Partial<Response>;
const next = jest.fn() as NextFunction;

describe("Given a notFoundError middleware", () => {
  describe("When it receives a response", () => {
    test("Then it should call its next method", async () => {
      notFoundError(req, res as Response, next);
      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a generalError middleware", () => {
  describe("When it receives a response and a customError", () => {
    test("Then it should call its status method with 500", async () => {
      const expectedStatus = 500;

      const error = new CustomError(
        "Something went wrong",
        expectedStatus,
        "Something went wrong"
      );

      generalError(error, req, res as Response, next);
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
  describe("When it receives a response and an error", () => {
    test("Then it should call its status method with 500", async () => {
      const expectedStatus = 500;

      const error = new Error();

      generalError(error as CustomError, req, res as Response, next);
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
});
