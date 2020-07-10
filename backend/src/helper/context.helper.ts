import { Request, Response } from 'express';

export interface ContextHelper {
    req: Request
    res: Response
    payload?: { userId: string }
}