import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  IsPhoneNumber,
} from 'class-validator';

export class UpdateWebsiteSettingsDto {
  @ApiPropertyOptional({
    example: 'From Farm to Market',
    description: 'Website slogan',
  })
  @IsOptional()
  @IsString()
  slogan?: string;

  @ApiPropertyOptional({
    example: ['+20123456789', '+20198765432'],
    description: 'List of phone numbers',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsPhoneNumber(null, { each: true })
  phoneNumbers?: string[];

  @ApiPropertyOptional({
    example: ['info@company.com', 'sales@company.com'],
    description: 'List of contact emails',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsEmail({}, { each: true })
  emails?: string[];

  @ApiPropertyOptional({
    example: 'Cairo, Egypt',
    description: 'Company address',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    example: 'https://wa.me/20123456789',
    description: 'WhatsApp contact link',
  })
  @IsOptional()
  @IsUrl()
  whatsAppLink?: string;

  @ApiPropertyOptional({
    example: 'https://facebook.com/company',
  })
  @IsOptional()
  @IsUrl()
  facebookUrl?: string;

  @ApiPropertyOptional({
    example: 'https://instagram.com/company',
  })
  @IsOptional()
  @IsUrl()
  instagramUrl?: string;

  @ApiPropertyOptional({
    example: 'https://twitter.com/company',
  })
  @IsOptional()
  @IsUrl()
  twitterUrl?: string;

  @ApiPropertyOptional({
    example: 'https://linkedin.com/company',
  })
  @IsOptional()
  @IsUrl()
  linkedinUrl?: string;

  @ApiPropertyOptional({
    example: 'https://youtube.com/@company',
  })
  @IsOptional()
  @IsUrl()
  youtubeUrl?: string;
}
