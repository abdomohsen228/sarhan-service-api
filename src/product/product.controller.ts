import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

import { ProductService } from './product.service';
import { CreateProductRequestDto } from './dtos/request/create-product-request.dto';
import { CurrentUser } from '../decorators/currentUser';
import { JwtPayload } from '../auth/interfaces/jwtPayload.interface';
import { AuthGuard } from '../auth/guards/jwt-auth.guard';
import { MulterFileSystemStorage } from 'src/config/multer-storageConfig';
import { CreateCategoryRequestDto } from './dtos/request/create-category-request.dto';
import { GetProductByIdResponseDto } from './dtos/response/get-product-byId.response';

@ApiTags('Product Management')
@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  // get all products with pagination and filtering with category, origin, growing method, storage type, shelf life, harvest time, health benefits, calories level, vitamins, and packing options
  // get all products with pagination and filtering without category
  // get product by id
  // update product by id
  // delete product by id
  // get all categories
  // get category by id
  // update category by id
  // delete category by id
  @Get(':productId')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product retrieved successfully',
    type: GetProductByIdResponseDto,
  })
  public async getProductById(
    @Param('productId') productId: number,
  ): Promise<GetProductByIdResponseDto> {
    return this.productService.getProductById(productId);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor(
      'images',
      3,
      MulterFileSystemStorage.getStorageConfig('products', 3),
    ),
  )
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product created successfully',
    type: String,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        categoryId: { type: 'number' },

        origin: { type: 'string' },
        growingMethod: { type: 'string' },
        storage: { type: 'string' },
        shelfLife: { type: 'string' },
        harvestTime: { type: 'string' },

        healthBenefits: {
          type: 'array',
          items: { type: 'string' },
        },
        caloriesLevel: { type: 'string' },
        vitamins: {
          type: 'array',
          items: { type: 'string' },
        },
        packingOptions: {
          type: 'array',
          items: { type: 'string' },
        },

        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  async createProduct(
    @CurrentUser() userPayload: JwtPayload,
    @Body() createProductRequestDto: CreateProductRequestDto,
    @UploadedFiles() uploadUserDetailsImages: Array<Express.Multer.File>,
  ): Promise<string> {
    return this.productService.createProduct(
      userPayload.id,
      createProductRequestDto,
      uploadUserDetailsImages,
    );
  }

  @Post('categories')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateCategoryRequestDto })
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Category created successfully',
    type: String,
  })
  public async createCategory(
    @CurrentUser() userPayload: JwtPayload,
    @Body() createCategoryDto: CreateCategoryRequestDto,
  ): Promise<string> {
    return this.productService.createCategory(
      userPayload.id,
      createCategoryDto,
    );
  }
}
