import { EntityRepository, Repository } from 'typeorm';
import { PredictionEntity } from './entities/prediction.entity';

@EntityRepository(PredictionEntity)
export class PredictionsRepository extends Repository<PredictionEntity> {}
