import { diskStorage, FileFilterCallback } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestException } from '@nestjs/common';
import {
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_IMAGE_FILE_SIZE_BYTES,
} from './multer-constants';
import { ImageUploadRequest } from './interfaces/image-upload-request.interface';

export class MulterFileSystemStorage {
  static getStorageConfig(
    uploadType: 'places' | 'userIds',
    maxFileCount: number = 5,
  ) {
    return {
      storage: diskStorage({
        destination: (
          imageUploadRequest: ImageUploadRequest,
          imageUploadfile,
          diskStorageCallback,
        ) => {
          const userIdFromParams = imageUploadRequest.params['id'];
          imageUploadRequest.uploadUserId = userIdFromParams;

          const userBaseDirectory =
            uploadType === 'places' ? 'places' : 'userIds';
          const userUploadsDirectory = path.join(
            __dirname,
            '..',
            '..',
            'uploads',
            userBaseDirectory,
            `user_${userIdFromParams}`,
          );

          fs.mkdirSync(userUploadsDirectory, { recursive: true });
          diskStorageCallback(null, userUploadsDirectory);
        },
        filename: (
          imageUploadRequest: ImageUploadRequest,
          fileUploadRequest,
          imageFileNameCallback,
        ) => {
          const uniqueFileId = uuidv4();
          imageUploadRequest.uploadUUID = uniqueFileId;

          const baseFileName = path
            .basename(
              fileUploadRequest.originalname,
              path.extname(fileUploadRequest.originalname),
            )
            .replace(/[^\w\-]/g, '_');
          const fileExt = path.extname(fileUploadRequest.originalname);
          const storedFileName = `${uniqueFileId}_${baseFileName}${fileExt}`;

          if (!imageUploadRequest.uploadedFilenames)
            imageUploadRequest.uploadedFilenames = [];
          imageUploadRequest.uploadedFilenames.push(storedFileName);

          imageFileNameCallback(null, storedFileName);
        },
      }),
      limits: { fileSize: MAX_IMAGE_FILE_SIZE_BYTES, file: maxFileCount },
      fileFilter: (
        imageUploadRequest: Request,
        imageUploadFile: Express.Multer.File,
        fileFilterCallback: FileFilterCallback,
      ) => {
        if (!ALLOWED_IMAGE_MIME_TYPES.includes(imageUploadFile.mimetype)) {
          throw new BadRequestException(
            `Invalid image type: ${imageUploadFile.mimetype}. Allowed types are: ${ALLOWED_IMAGE_MIME_TYPES.join(', ')}. Please upload an image in one of the allowed formats.`,
          );
        }
        fileFilterCallback(null, true);
      },
    };
  }
}
