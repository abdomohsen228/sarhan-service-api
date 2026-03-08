import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../admin/entities/admin.entity';
import { News } from './entities/news.entity';
import { CreateNewsDto } from './dtos/request/create-news.dto';
import { UpdateNewsDto } from './dtos/request/update-news.dto';
import { NewsFilterDto } from './dtos/request/news-filter.dto';
import { PaginatedNewsResponseDto } from './dtos/response/paginated-news.dto';
import { NewsItemDto } from './dtos/response/news-item.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  public async getAllNews(
    filterDto: NewsFilterDto,
  ): Promise<PaginatedNewsResponseDto> {
    const { page = 1, limit = 10 } = filterDto;

    const [items, total] = await this.newsRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    const newsItems: NewsItemDto[] = items.map((item) => {
      const dto = new NewsItemDto();
      Object.assign(dto, item);
      return dto;
    });

    return {
      page,
      limit,
      total,
      news: newsItems,
    };
  }

  public async getNewsById(id: number): Promise<NewsItemDto> {
    const item = await this.newsRepository.findOne({ where: { id } });
    if (!item) {
      throw new BadRequestException(
        `News with ID ${id} not found. Please provide a valid news ID.`,
      );
    }

    const dto = new NewsItemDto();
    Object.assign(dto, item);
    return dto;
  }

  public async createNews(
    adminId: number,
    createDto: CreateNewsDto,
  ): Promise<string> {
    const admin = await this.adminRepository.findOne({ where: { id: adminId } });
    if (!admin) {
      throw new BadRequestException('Admin not found');
    }

    const news = this.newsRepository.create(createDto);
    await this.newsRepository.save(news);

    return 'News created successfully';
  }

  public async updateNews(
    adminId: number,
    id: number,
    updateDto: UpdateNewsDto,
  ): Promise<string> {
    const admin = await this.adminRepository.findOne({ where: { id: adminId } });
    if (!admin) {
      throw new BadRequestException('Admin not found');
    }

    const existing = await this.newsRepository.findOne({ where: { id } });
    if (!existing) {
      throw new BadRequestException(
        `News with ID ${id} not found. Please provide a valid news ID.`,
      );
    }

    Object.assign(existing, updateDto);
    await this.newsRepository.save(existing);
    return 'News updated successfully';
  }

  public async deleteNews(adminId: number, id: number): Promise<string> {
    const admin = await this.adminRepository.findOne({ where: { id: adminId } });
    if (!admin) {
      throw new BadRequestException('Admin not found');
    }

    const existing = await this.newsRepository.findOne({ where: { id } });
    if (!existing) {
      throw new BadRequestException(
        `News with ID ${id} not found. Please provide a valid news ID.`,
      );
    }

    await this.newsRepository.remove(existing);
    return 'News deleted successfully';
  }
}

