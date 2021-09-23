import { Body, Delete, Param, Post, Query, UseGuards } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/auth/auth.decorator';
import { RequiredAuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from 'src/users/users.entity';
import { CategoryEntity } from './categories.entity';
import { CategoriesService } from './categories.service';

class CategoryCreateRequestBody {
  @ApiProperty() name: string;
  @ApiProperty() amount: number;
}

class CategoryDetailsQueryParams {
  @ApiPropertyOptional() authorId: string;
  @ApiPropertyOptional() hashtags: string[];
}

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/')
  async getAllCategories(
    @Query() query: CategoryDetailsQueryParams,
  ): Promise<CategoryEntity[]> {
    return await this.categoriesService.getAllCategories(query.authorId);
  }

  @Get('/:categoryId')
  async getCategoryDetails(
    @Param('categoryId') categoryId: string,
  ): Promise<CategoryEntity> {
    return await this.categoriesService.getCategory(categoryId);
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Post('/')
  async createNewCategory(
    @User() owner: UserEntity,
    @Body() category: CategoryCreateRequestBody,
  ): Promise<CategoryEntity> {
    const createdCategory = await this.categoriesService.createCategory(
      category,
      owner,
    );
    return createdCategory;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Delete('/:categoryid')
  async deleteCategory(
    @Param('categoryid') categoryid: string,
  ): Promise<boolean> {
    return await this.categoriesService.deleteCategory(categoryid);
  }
}
