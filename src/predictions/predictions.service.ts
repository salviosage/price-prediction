import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { PredictionEntity } from './entities/prediction.entity';
import { PredictionsRepository } from './predictions.repository';
import { Depreciation as vehicles } from './utils/data';
import priceCalculator from './utils/formula';
var GeocoderGeonames = require('geocoder-geonames'),
    geocoder = new GeocoderGeonames({
      username:'salviosage',
    });

@Injectable()
export class PredictionsService {
  constructor(private predictionsRepository: PredictionsRepository) {}
  /**
   * @description find all predictions
   */
  async getAllPredictions(
    client?: UserEntity,
  ): Promise<Array<PredictionEntity>> {
    const queryBuilder = this.predictionsRepository
      .createQueryBuilder('predictions')
      .leftJoinAndSelect('predictions.client', 'UserEntity.id');

    return queryBuilder
      .addSelect('predictions.created_at')
      .orderBy('predictions.created_at', 'DESC')
      .limit(100)
      .getMany();
  }

  /**
   * @description find prediction by id
   */
  async getPrediction(id: string,client: UserEntity): Promise<PredictionEntity> {
    return this.predictionsRepository.findOne({id,client },{
      relations: ['cleint'],
    });
  }

  /**
   * @description delete prediction by id
   */
  async deletePrediction(id: string,client: UserEntity): Promise<boolean> {
    const deleteResult = await this.predictionsRepository.delete({ id ,client});
    return deleteResult.affected === 1;
  }

  /**
   * @description create prediction
   */
  async createPrediction(
    prediction: Partial<PredictionEntity>,
    client: UserEntity,
  ): Promise<{message:String,data:{
    from: string,
    to: string,
    vehicle: string,
    price: string
}[],entity:PredictionEntity}> {
    const{from,to,distance}=prediction;
    if (!distance || !from || !to) {
      throw new BadRequestException(
        'Prediction request should have adistance ,arigin location and destination location',
      );
    }
    // geocoder.get(`search`,{
    //   q: 'Berlin'
    // })
    // .then(function(response){
    //   console.log(response);
    // })
    // .catch(function(error){
    //   console.log(error);
    // });
    if (!Number(distance)){
      throw new BadRequestException(
        'distance must be a number...',
      );
  }
        let tripPrices:{
            from: string,
            to: string,
            vehicle: string,
            price: string
        }[] = [];
        vehicles.map(vehicle => {
            const { clientPrice } = priceCalculator.calculate( vehicle.name, distance);
            if(clientPrice){
                tripPrices.push({
                  from,
                  to,
                    vehicle: vehicle.name,
                    price: clientPrice.split(' RWF')[0]
                });
            }
        });
      const newPrediction = new PredictionEntity();
    newPrediction.from = from;
    newPrediction.to= to;
    newPrediction.distance = distance;
    newPrediction.client = client;

    const savedPrediction = await this.predictionsRepository.save(newPrediction);
    
        return {
            message: 'Success',
            data: tripPrices,
            entity:savedPrediction,
        }
    }
    

    
  }

