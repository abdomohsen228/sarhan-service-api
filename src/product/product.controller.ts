import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
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
import { ProductFilterDto } from './dtos/request/products-query-filter.dto';
import { PaginatedProductsResponseDto } from './dtos/response/paginated-product.dto';

@ApiTags('Product Management')
@ApiBearerAuth()
@Controller('')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('admin/products/:productId')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product retrieved successfully',
    type: GetProductByIdResponseDto,
  })
  public async adminGetProductById(
    @Param('productId') productId: number,
  ): Promise<GetProductByIdResponseDto> {
    return this.productService.getProductById(productId);
  }
  @Get('products/:productId')
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

  @Get('categories/:categoryName/products')
  @ApiOperation({ summary: 'Get products by category name' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Products retrieved successfully',
    type: PaginatedProductsResponseDto,
  })
  public async getProductsByCategoryName(
    @Param('categoryName') categoryName: string,
    @Query() filterDto: ProductFilterDto,
  ): Promise<PaginatedProductsResponseDto> {
    return this.productService.getProductsByCategoryName(
      categoryName,
      filterDto,
    );
  }

  @Put('admin/products/:productId')
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
  async updateProduct(
    @CurrentUser() userPayload: JwtPayload,
    @Param('productId') productId: number,
    @Body() updateProductRequestDto: CreateProductRequestDto,
    @UploadedFiles() uploadUserDetailsImages: Array<Express.Multer.File>,
  ): Promise<string> {
    return this.productService.updateProductById(
      productId,
      updateProductRequestDto,
      uploadUserDetailsImages,
    );
  }
  @Get('products')
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Products retrieved successfully',
    type: PaginatedProductsResponseDto,
  })
  public async getAllProducts(
    @Query() filterDto: ProductFilterDto,
  ): Promise<PaginatedProductsResponseDto> {
    return this.productService.getAllProducts(filterDto);
  }

  @Post('admin/products')
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
  @Delete('admin/products/:productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Product deleted successfully',
    type: String,
  })
  public async deleteProduct(
    @CurrentUser() userPayload: JwtPayload,
    @Param('productId') productId: number,
  ): Promise<string> {
    return await this.productService.deleteProductById(productId);
  }

  @Post('admin/categories')
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
