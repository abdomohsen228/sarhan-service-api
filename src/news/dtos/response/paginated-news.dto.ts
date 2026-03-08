import { ApiProperty } from '@nestjs/swagger';
import { NewsItemDto } from './news-item.dto';

export class PaginatedNewsResponseDto {
  @ApiProperty({ example: 1, description: 'Current page number' })
  page: number;

  @ApiProperty({ example: 10, description: 'Number of items per page' })
  limit: number;

  @ApiProperty({ example: 100, description: 'Total number of items' })
  total: number;

  @ApiProperty({
    type: [NewsItemDto],
    description: 'List of news items',
  })
  news: NewsItemDto[];
}

