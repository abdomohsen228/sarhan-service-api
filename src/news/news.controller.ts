import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NewsService } from './news.service';
import { NewsFilterDto } from './dtos/request/news-filter.dto';
import { PaginatedNewsResponseDto } from './dtos/response/paginated-news.dto';
import { NewsItemDto } from './dtos/response/news-item.dto';
import { CreateNewsDto } from './dtos/request/create-news.dto';
import { UpdateNewsDto } from './dtos/request/update-news.dto';
import { AuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/currentUser';
import { JwtPayload } from '../auth/interfaces/jwtPayload.interface';

@ApiTags('News Management')
@Controller('')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('news')
  @ApiOperation({ summary: 'Get paginated list of news' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'News items retrieved successfully',
    type: PaginatedNewsResponseDto,
  })
  public async getAllNews(
    @Query() filterDto: NewsFilterDto,
  ): Promise<PaginatedNewsResponseDto> {
    return this.newsService.getAllNews(filterDto);
  }

  @Get('news/:newsId')
  @ApiOperation({ summary: 'Get news item by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'News item retrieved successfully',
    type: NewsItemDto,
  })
  public async getNewsById(
    @Param('newsId', ParseIntPipe) newsId: number,
  ): Promise<NewsItemDto> {
    return this.newsService.getNewsById(newsId);
  }

  @Post('admin/news')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new news item' })
  @ApiBody({ type: CreateNewsDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'News item created successfully',
    type: String,
  })
  public async createNews(
    @CurrentUser() userPayload: JwtPayload,
    @Body() createDto: CreateNewsDto,
  ): Promise<string> {
    return this.newsService.createNews(userPayload.id, createDto);
  }

  @Put('admin/news/:newsId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an existing news item' })
  @ApiBody({ type: UpdateNewsDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'News item updated successfully',
    type: String,
  })
  public async updateNews(
    @CurrentUser() userPayload: JwtPayload,
    @Param('newsId', ParseIntPipe) newsId: number,
    @Body() updateDto: UpdateNewsDto,
  ): Promise<string> {
    return this.newsService.updateNews(userPayload.id, newsId, updateDto);
  }

  @Delete('admin/news/:newsId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a news item by ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'News item deleted successfully',
    type: String,
  })
  public async deleteNews(
    @CurrentUser() userPayload: JwtPayload,
    @Param('newsId', ParseIntPipe) newsId: number,
  ): Promise<string> {
    return this.newsService.deleteNews(userPayload.id, newsId);
  }
}

