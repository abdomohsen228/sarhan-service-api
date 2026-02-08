import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
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

@ApiTags('Product Management')
@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor(
      'images',
      3,
      MulterFileSystemStorage.getStorageConfig('product', 3),
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
}
