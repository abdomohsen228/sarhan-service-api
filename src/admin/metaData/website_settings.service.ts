import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebsiteSettings } from './website-settings.entity';
import { GetWebsiteSettingResponseDto } from './dto/getWebsiteSetting.dto';
import { UpdateWebsiteSettingsDto } from './dto/updateWebsiteSetting.dto';

@Injectable()
export class WebsiteSettingsService {
  constructor(
    @InjectRepository(WebsiteSettings)
    private readonly websiteSettingsRepository: Repository<WebsiteSettings>,
  ) {}

  private async getSettingsEntity(): Promise<WebsiteSettings> {
    const settings = await this.websiteSettingsRepository.findOne({
      where: { id: 1 },
    });
    return settings;
  }
  public async getSettings(): Promise<GetWebsiteSettingResponseDto> {
    const settings = await this.getSettingsEntity();
    return this.mapToDto(settings);
  }
  public async update(
    updateDto: UpdateWebsiteSettingsDto,
  ): Promise<GetWebsiteSettingResponseDto> {
    const settings = await this.getSettingsEntity();

    Object.assign(settings, updateDto);

    const updated = await this.websiteSettingsRepository.save(settings);
    return this.mapToDto(updated);
  }
  private mapToDto(settings: WebsiteSettings): GetWebsiteSettingResponseDto {
    const dto = new GetWebsiteSettingResponseDto();
    Object.assign(dto, settings);
    return dto;
  }
}
