import { BadRequestException, Injectable, UploadedFiles } from '@nestjs/common';
import { Admin } from '../admin/entities/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductRequestDto } from './dtos/request/create-product-request.dto';
import path from 'path';
import { ConfigService } from '@nestjs/config';
import { UploadedImageFile } from 'src/config/image-upload-file.interface';
import { ALLOWED_IMAGE_MIME_TYPES, MAX_IMAGE_FILE_SIZE_BYTES } from 'src/config/multer-constants';

@Injectable()
export class ProductService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly configService: ConfigService,
  ) {}
  public async createProduct(
    adminId: number,
    createProductRequestDto: CreateProductRequestDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<string> {
    const admin = await this.adminRepository.findOne({
      where: { id: adminId },
    });
    if (!admin) {
      throw new Error('Admin not found');
    }
    if (!images || images.length === 0) {
      throw new BadRequestException(
        'At least one product image is required. Please upload at least one image of the product.',
      );
    }
    const userImagesUploadUrls = this.validateAndBuildImageUrls(images);

    return 'Product created successfully';
  }
  private validateAndBuildImageUrls(imageUrls: UploadedImageFile[]): string[] {
    return imageUrls.map((imageUploadFile) => {
      if (!ALLOWED_IMAGE_MIME_TYPES.includes(imageUploadFile.mimetype)) {
        throw new BadRequestException(
          `Invalid image type: ${imageUploadFile.mimetype}. Allowed types are: ${ALLOWED_IMAGE_MIME_TYPES.join(', ')}. Please upload an image in one of the allowed formats.`,
        );
      }
      if (imageUploadFile.size > MAX_IMAGE_FILE_SIZE_BYTES) {
        throw new BadRequestException(
          "Uploaded image exceeds the maximum allowed size of 5MB. Please upload an image smaller than 5MB.",
        );
      }
      const imageUploadUUID =
        imageUploadFile.uploadUUID ||
        path.basename(path.dirname(imageUploadFile.path));
      const storedFilename = imageUploadFile.filename;

      return `${this.configService.get<string>('SERVER_URL')}/uploads/product/${imageUploadUUID}/${storedFilename}`;
    });
  }
}
