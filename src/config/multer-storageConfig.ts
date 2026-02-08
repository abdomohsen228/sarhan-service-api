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
    uploadType: 'products' | 'userIds',
    maxFileCount: number = 5,
  ) {
    return {
      storage: diskStorage({
        destination: (
          imageUploadRequest: ImageUploadRequest,
          imageUploadfile,
          diskStorageCallback,
        ) => {
          const userBaseDirectory =
            uploadType === 'products' ? 'products' : 'userIds';

          let uploadsDirectory: string;

          if (uploadType === 'products') {
            uploadsDirectory = path.join(
              __dirname,
              '..',
              '..',
              'uploads',
              userBaseDirectory,
            );
            imageUploadRequest.uploadUserId = undefined;
            imageUploadfile['userFolder'] = undefined;
          } else {
            const userIdFromParams = imageUploadRequest.params['id'];
            imageUploadRequest.uploadUserId = Array.isArray(userIdFromParams)
              ? userIdFromParams[0]
              : userIdFromParams || 'default';

            const userFolderName = `user_${userIdFromParams}`;
            imageUploadfile['userFolder'] = userFolderName;

            uploadsDirectory = path.join(
              __dirname,
              '..',
              '..',
              'uploads',
              userBaseDirectory,
              userFolderName,
            );
          }

          fs.mkdirSync(uploadsDirectory, { recursive: true });
          diskStorageCallback(null, uploadsDirectory);
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
