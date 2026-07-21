import { Request } from 'express';
import { RequestUser } from '../auth.types';

export interface AuthenticatedRequest extends Request {
  user?: RequestUser;
}
