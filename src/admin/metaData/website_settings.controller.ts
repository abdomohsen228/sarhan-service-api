import { Controller, Put, Body, UseGuards, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBody } from '@nestjs/swagger';
import { WebsiteSettingsService } from './website_settings.service';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateWebsiteSettingsDto } from './dto/updateWebsiteSetting.dto';
import { GetWebsiteSettingResponseDto } from './dto/getWebsiteSetting.dto';

@ApiTags('Website Settings')
@UseGuards(AuthGuard)
@Controller('')
export class WebsiteSettingsController {
  constructor(
    private readonly websiteSettingsService: WebsiteSettingsService,
  ) {}

  @Put()
  @ApiOperation({ summary: 'Update main website settings' })
  @ApiBody({ type: UpdateWebsiteSettingsDto })
  @ApiOkResponse({
    description: 'Website settings updated successfully',
    type: GetWebsiteSettingResponseDto,
  })
  public async updateWebsiteSettings(
    @Body() dto: UpdateWebsiteSettingsDto,
  ): Promise<GetWebsiteSettingResponseDto> {
    return this.websiteSettingsService.update(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get main website settings' })
  @ApiOkResponse({
    description: 'Website settings retrieved successfully',
    type: GetWebsiteSettingResponseDto,
  })
  public async getWebsiteSettings(): Promise<GetWebsiteSettingResponseDto> {
    return this.websiteSettingsService.getSettings();
  }
}
