import { Request, ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export interface ImageUploadRequest extends Request<
  ParamsDictionary,
  any,
  any,
  ParsedQs,
  Record<string, any>
> {
  uploadedFilenames?: string[];
  uploadUUID?: string;
  uploadUserId?: string;
}
