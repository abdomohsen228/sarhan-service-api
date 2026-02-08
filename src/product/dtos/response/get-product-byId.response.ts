import { ApiProperty } from '@nestjs/swagger';
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

export class GetProductByIdResponseDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the product',
  })
  id: number;
  @ApiProperty({
    example: 'Fresh Apple',
    description: 'The name of the product',
  })
  name: string;
  @ApiProperty({
    example: 'A fresh and juicy apple',
    description: 'The description of the product',
  })
  description: string;
  @ApiProperty({
    example: ProductOrigin.EGYPT,
    description: 'The origin of the product',
  })
  origin: ProductOrigin;
  @ApiProperty({
    example: GrowingMethod.ORGANIC,
    description: 'The growing method of the product',
  })
  growingMethod: GrowingMethod;
  @ApiProperty({
    example: StorageType.REFRIGERATED,
    description: 'The storage type of the product',
  })
  storage: StorageType;

  @ApiProperty({
    example: ShelfLife.MEDIUM,
    description: 'The shelf life of the product',
  })
  shelfLife: ShelfLife;
  @ApiProperty({
    example: HarvestTime.MID_SEASON,
    description: 'The harvest time of the product',
  })
  harvestTime: HarvestTime;
  @ApiProperty({
    example: [HealthBenefit.IMMUNITY, HealthBenefit.DIGESTION],
    description: 'The health benefits of the product',
  })
  healthBenefits: HealthBenefit[];
  @ApiProperty({
    example: CaloriesLevel.LOW,
    description: 'The calories level of the product',
  })
  caloriesLevel: CaloriesLevel;
  @ApiProperty({
    example: [VitaminType.VITAMIN_A, VitaminType.VITAMIN_C],
    description: 'The vitamins contained in the product',
  })
  vitamins: VitaminType[];
  @ApiProperty({
    example: [PackingOption.BULK, PackingOption.PLASTIC_BOX],
    description: 'The packing options available for the product',
  })
  packingOptions: PackingOption[];
  @ApiProperty({
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    description: 'The URLs of the product images',
  })
  imageUrls: string[];
  @ApiProperty({
    example: {
      id: 1,
      name: 'Fruits',
      description: 'Fresh fruits category',
    },
    description: 'The category of the product',
  })
  category: {
    id: number;
    name: string;
    description?: string;
  };
}
