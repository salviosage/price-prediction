import { CategoryEntity } from 'src/categories/categories.entity';
import { Repository } from 'typeorm';

export class MockCategoriesRepository extends Repository<CategoryEntity> {}
