import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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
} from '../enums/product.enums';
import { Category } from './category.entity';
import { ProductImage } from './product-image.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: ProductOrigin })
  origin: ProductOrigin;

  @Column({ type: 'enum', enum: GrowingMethod })
  growingMethod: GrowingMethod;

  @Column({ type: 'enum', enum: StorageType })
  storage: StorageType;

  @Column({ type: 'enum', enum: ShelfLife })
  shelfLife: ShelfLife;

  @Column({ type: 'enum', enum: HarvestTime })
  harvestTime: HarvestTime;

  @Column({
    type: 'enum',
    enum: HealthBenefit,
    array: true,
  })
  healthBenefits: HealthBenefit[];

  @Column({ type: 'enum', enum: CaloriesLevel })
  caloriesLevel: CaloriesLevel;

  @Column({
    type: 'enum',
    enum: VitaminType,
    array: true,
  })
  vitamins: VitaminType[];

  @Column({
    type: 'enum',
    enum: PackingOption,
    array: true,
  })
  packingOptions: PackingOption[];

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'SET NULL',
  })
  category: Category;

  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
  })
  images: ProductImage[];
}
