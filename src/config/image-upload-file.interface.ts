import { Express } from 'express';

export interface UploadedImageFile extends Express.Multer.File {
  uploadUUID?: string;
  uploadUserId?: string;
}
