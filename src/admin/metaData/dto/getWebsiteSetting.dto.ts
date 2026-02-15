import { ApiProperty } from '@nestjs/swagger';

export class GetWebsiteSettingResponseDto {
  @ApiProperty({
    example: 'We deliver fresh products to your door',
    description: 'Website slogan',
  })
  slogan: string;

  @ApiProperty({
    example: ['+201234567890', '+201098765432'],
    description: 'List of phone numbers',
    type: [String],
  })
  phoneNumbers: string[];

  @ApiProperty({
    example: ['info@company.com', 'support@company.com'],
    description: 'List of contact emails',
    type: [String],
  })
  emails: string[];

  @ApiProperty({
    example: 'Cairo, Egypt',
    description: 'Company address',
  })
  address: string;

  @ApiProperty({
    example: 'https://wa.me/201234567890',
    description: 'WhatsApp contact link',
  })
  whatsAppLink: string;

  @ApiProperty({
    example: 'https://facebook.com/company',
    description: 'Facebook page URL',
  })
  facebookUrl: string;

  @ApiProperty({
    example: 'https://instagram.com/company',
    description: 'Instagram profile URL',
  })
  instagramUrl: string;

  @ApiProperty({
    example: 'https://twitter.com/company',
    description: 'Twitter (X) profile URL',
  })
  twitterUrl: string;

  @ApiProperty({
    example: 'https://linkedin.com/company/company-name',
    description: 'LinkedIn page URL',
  })
  linkedinUrl: string;

  @ApiProperty({
    example: 'https://youtube.com/@company',
    description: 'YouTube channel URL',
  })
  youtubeUrl: string;

  @ApiProperty({
    example: 'https://company.com/logo.png',
    description: 'Website logo URL',
  })
  logoUrl: string;
}
