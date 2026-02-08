import { BadRequestException, Injectable, UploadedFiles } from '@nestjs/common';
import { Admin } from '../admin/entities/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductRequestDto } from './dtos/request/create-product-request.dto';
import { ConfigService } from '@nestjs/config';
import { UploadedImageFile } from '../config/image-upload-file.interface';
import {
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_IMAGE_FILE_SIZE_BYTES,
} from 'src/config/multer-constants';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { CreateCategoryRequestDto } from './dtos/request/create-category-request.dto';
import { GetProductByIdResponseDto } from './dtos/response/get-product-byId.response';

@Injectable()
export class ProductService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly configService: ConfigService,
  ) {}
  public async getProductById(
    productId: number,
  ): Promise<GetProductByIdResponseDto> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['category'],
    });
    if (!product) {
      throw new BadRequestException(
        `Product with ID ${productId} not found. Please provide a valid product ID.`,
      );
    }
    const response = new GetProductByIdResponseDto();
    Object.assign(response, product);
    return response;
  }
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
    const category = await this.productRepository.manager.findOne('Category', {
      where: { id: createProductRequestDto.categoryId },
    });
    if (!category) {
      throw new BadRequestException(
        `Category with ID ${createProductRequestDto.categoryId} not found. Please provide a valid category ID.`,
      );
    }
    const userImagesUploadUrls = this.validateAndBuildImageUrls(images);
    const product = this.productRepository.create({
      ...createProductRequestDto,
      imageUrls: userImagesUploadUrls,
    });
    product.categoryId = category.id;
    await this.productRepository.save(product);

    return 'Product created successfully';
  }
  public async createCategory(
    adminId: number,
    createCategoryRequestDto: CreateCategoryRequestDto,
  ): Promise<string> {
    const admin = await this.adminRepository.findOne({
      where: { id: adminId },
    });
    if (!admin) {
      throw new Error('Admin not found');
    }
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: createCategoryRequestDto.name },
    });
    if (existingCategory) {
      throw new BadRequestException(
        `A category with the name "${createCategoryRequestDto.name}" already exists. Please choose a different name for the category.`,
      );
    }
    const category = this.categoryRepository.create(createCategoryRequestDto);
    await this.categoryRepository.save(category);
    return 'Category created successfully';
  }
  private validateAndBuildImageUrls(imageFiles: UploadedImageFile[]): string[] {
    return imageFiles.map((file) => {
      if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.mimetype)) {
        throw new BadRequestException(
          `Invalid image type: ${file.mimetype}. Allowed types are: ${ALLOWED_IMAGE_MIME_TYPES.join(', ')}.`,
        );
      }
      if (file.size > MAX_IMAGE_FILE_SIZE_BYTES) {
        throw new BadRequestException('Uploaded image exceeds max size 5MB.');
      }

      return `${this.configService.get<string>('SERVER_URL')}/uploads/products/${file.filename}`;
    });
  }
}
