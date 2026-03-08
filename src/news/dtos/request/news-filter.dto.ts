import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export class NewsFilterDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @IsInt()
  @Min(1)
  limit?: number;
}

