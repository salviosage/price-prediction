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
    if(client.role !== 'Admin'){
      throw new BadRequestException('You dont have privilage to perform such action')
    }

    const queryBuilder = this.predictionsRepository
      .createQueryBuilder('predictions')
      .leftJoinAndSelect('predictions.client', 'client');

   const ret = await queryBuilder
      .addSelect('predictions.created_at')
      .orderBy('predictions.created_at', 'DESC')
      .limit(100)
      .getMany();
      return ret;
  }
  async getPredictionsStats(
    client: UserEntity,
  ): Promise<Number> {
    if(client.role !== "Admin"){
      throw new BadRequestException('Unauthorised')
    }
    const ret = await this.predictionsRepository.count();
      // .createQueryBuilder('predictions')
      // .leftJoinAndSelect('predictions.client', 'client');
      //       const ret = await queryBuilder.addSelect('predictions.created_at')
      //       // .select('predictions.created_at')
      //       // .groupBy('predictions.created_at')
      //             .orderBy('predictions.created_at', 'DESC')
      //             .limit(100)
      //             .getMany();
      //             console.log
      return ret;
  }
  async getMyPredictions(
    client: UserEntity,
  ): Promise<Array<PredictionEntity>> {
    if(client.verified === false){
      throw new BadRequestException('You need to verify your account first')
    }
    const queryBuilder = this.predictionsRepository
      .createQueryBuilder('predictions')
      .leftJoinAndSelect('predictions.client', 'client');
        queryBuilder.where(`predictions.client = :id`, { id:client.id });
  
   const ret = await queryBuilder
      .addSelect('predictions.created_at')
      .orderBy('predictions.created_at', 'DESC')
      .limit(100)
      .getMany();
      return ret;
  }
  /**
   * @description find prediction by id
   */
  async getPrediction(id: string,client: UserEntity): Promise<PredictionEntity> {
    if(client.verified === false){
      throw new BadRequestException(
        'You are not verified to perform such action please contact admin',
      );
    }
    return this.predictionsRepository.findOne({id,client },{
      relations: ['cleint'],
    });
  }

  /**
   * @description delete prediction by id
   */
  async deletePrediction(id: string,client: UserEntity): Promise<boolean> {
    if(client.verified === false){
      throw new BadRequestException(
        'You are not verified to perform such action please contact admin',
      );
    }
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
    if(client.verified === false){
      throw new BadRequestException(
        'You are not verified to perform such action please contact admin',
      );
    }
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

