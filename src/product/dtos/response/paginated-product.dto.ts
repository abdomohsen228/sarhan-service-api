import { ApiProperty } from '@nestjs/swagger';
import { GetProductByIdResponseDto } from './get-product-byId.response';

export class PaginatedProductsResponseDto {
  @ApiProperty({ example: 1, description: 'Current page number' })
  page: number;

  @ApiProperty({ example: 10, description: 'Number of items per page' })
  limit: number;

  @ApiProperty({ example: 100, description: 'Total number of items' })
  total: number;

  @ApiProperty({
    type: [GetProductByIdResponseDto],
    description: 'List of products',
  })
  products: GetProductByIdResponseDto[];
}
