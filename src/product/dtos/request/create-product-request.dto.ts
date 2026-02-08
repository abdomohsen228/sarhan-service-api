import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsNumber,
} from 'class-validator';
import {
  CaloriesLevel,
  GrowingMethod,
  HarvestTime,
  HealthBenefit,
  PackingOption,
  ProductOrigin,
  ShelfLife,
  StorageType,
  VitaminType,
} from '../../../product/enums/product.enums';

export class CreateProductRequestDto {
  @ApiProperty({ example: 'Fresh Oranges' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'High-quality Egyptian oranges for export',
    description: 'Detailed description of the product',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: 1, description: 'Category ID' })
  @IsNumber()
  categoryId: number;

  @ApiProperty({ enum: ProductOrigin })
  @IsEnum(ProductOrigin)
  origin: ProductOrigin;

  @ApiProperty({ enum: GrowingMethod })
  @IsEnum(GrowingMethod)
  growingMethod: GrowingMethod;

  @ApiProperty({ enum: StorageType })
  @IsEnum(StorageType)
  storage: StorageType;

  @ApiProperty({ enum: ShelfLife })
  @IsEnum(ShelfLife)
  shelfLife: ShelfLife;

  @ApiProperty({ enum: HarvestTime })
  @IsEnum(HarvestTime)
  harvestTime: HarvestTime;

  @ApiProperty({ enum: HealthBenefit, isArray: true })
  @IsArray()
  @IsEnum(HealthBenefit, { each: true })
  healthBenefits: HealthBenefit[];

  @ApiProperty({ enum: CaloriesLevel })
  @IsEnum(CaloriesLevel)
  caloriesLevel: CaloriesLevel;

  @ApiProperty({ enum: VitaminType, isArray: true })
  @IsArray()
  @IsEnum(VitaminType, { each: true })
  vitamins: VitaminType[];

  @ApiProperty({ enum: PackingOption, isArray: true })
  @IsArray()
  @IsEnum(PackingOption, { each: true })
  packingOptions: PackingOption[];
}
