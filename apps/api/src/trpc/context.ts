import type { Request, Response } from "express"

export const createContext = ({
  req,
  res,
}: {
  req: Request
  res: Response
}) => {
  return {
    req,
    res,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
