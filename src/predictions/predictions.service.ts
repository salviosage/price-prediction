import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Console } from 'console';
import { UserEntity } from 'src/users/entities/user.entity';
import { PredictionEntity } from './entities/prediction.entity';
import { PredictionsRepository } from './predictions.repository';
import { Depreciation as vehicles } from './utils/data';
import priceCalculator from './utils/formula';

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
  async getPredictionsStatsByDay(
  ): Promise<Array<any>> {
    const queryBuilder = await this.predictionsRepository.manager.query
   (`SELECT
    extract(DAY FROM P.created_at)
         AS  day,
       COUNT(id) AS count
       FROM public."Prediction" P
GROUP BY extract(DAY FROM P.created_at)`);
      return queryBuilder;
  }
  async getPredictionsStatsByMonth(
    ): Promise<Array<any>> {
      console.log('in month')
      const queryBuilder = await this.predictionsRepository.manager.query
     (`SELECT
      extract(MONTH FROM P.created_at)
           AS  month,
         COUNT(id) AS count
         FROM public."Prediction" P
  GROUP BY extract(MONTH FROM P.created_at)`);
        return queryBuilder;
    }
    async getPredictionsStatsByYeear(
      ): Promise<Array<any>> {
        const queryBuilder = await this.predictionsRepository.manager.query
       (`SELECT
        extract(YEAR FROM P.created_at)
             AS  year,
           COUNT(id) AS count
           FROM public."Prediction" P
    GROUP BY extract(YEAR FROM P.created_at)`);
          return queryBuilder;
      }
  async getPredictionsStatsByUser(
  ): Promise<Array<any>> {
  
 
    const queryBuilder = await this.predictionsRepository.manager.query
  

(`SELECT
    extract(DAY FROM P.created_at)
         AS  month,P.client,
       COUNT(id) AS count
       FROM public."Prediction" P
GROUP BY extract(DAY FROM P.created_at),P.client`);
      return queryBuilder;
  }
  async getPredictionsStats(
    query:{  Period?: string;
     byUser?: Boolean},
    client: UserEntity,
  ): Promise<Array<any>> {
    if(client.role !== "Admin"){
      throw new BadRequestException('Unauthorised')
    }
    console.log(query.Period.toLocaleLowerCase())
    if(query.Period  && query.Period.toLocaleLowerCase()=='month'){
      console.log('it exist')
    }
    if(query.byUser===true){
      console.log('by user')
      return await this.getPredictionsStatsByUser()
    } else if(query.Period  && query.Period.toLocaleLowerCase()== 'day'){
      console.log('in day')
      return await this.getPredictionsStatsByDay()}
      else if(query.Period  && query.Period.toLocaleLowerCase()=='month'){
        console.log('in month')
        return await this.getPredictionsStatsByMonth()}
        else if(query.Period  && query.Period.toLocaleLowerCase()== 'year'){
          console.log('in year')
          return this.getPredictionsStatsByYeear()}
 else{

    const queryBuilder = await this.predictionsRepository.manager.query
    (`	SELECT COUNT(*) as count,P.id, extract(DAY FROM P.created_at) as date, P.updated_at, P."from", P."to", P.distance, P.client
    FROM public."Prediction" P group by date,P.id order by date desc`);
//    (`SELECT
//     extract(DAY FROM P.created_at)
//          AS  month,
//        COUNT(id) AS count
//        FROM public."Prediction" P
// GROUP BY extract(DAY FROM P.created_at)`);

// (`SELECT
//     extract(DAY FROM P.created_at)
//          AS  month,P.client,
//        COUNT(id) AS count
//        FROM public."Prediction" P
// GROUP BY extract(DAY FROM P.created_at),P.client`);

    // .createQueryBuilder('predictions')
    // .leftJoinAndSelect('predictions.client', 'client')
    // .addSelect('predictions.created_at')
    // .groupBy("predictions.created_at")
    //            .orderBy('predictions.created_at', 'DESC')
    //            .limit(100)
    //            .getRawMany();

    // .addSelect("COUNT(predictions.id) AS predictions_total_count" )
    // .leftJoinAndSelect(Jobs, "jobs", "jobs.id = jobViews.job_id")
    // .where("jobs.user_id != :id", { id: user_id })        
    // .groupBy("predictions.client")
    // .orderBy('predictions_total_count', 'DESC')   
    // .addSelect('predictions.created_at')
    //   .orderBy('predictions.created_at', 'DESC')
    //   .limit(100)       
    // .getRawMany();
    // const ret = await queryBuilder
      
    //   .getMany();
    //   return ret;

    // .count();
    
      
      //       .select('predictions.created_at')
      //       .addSelect('predictions.client')
      //       .addSelect('predictions.from')
      //       .addSelect("COUNT(predictions.photosCount)", "sum")
      //       .addSelect('predictions.to')
      //       .addSelect('predictions.distance')
      //       .groupBy('predictions.created_at').limit(100)
      //       .getRawMany();
            // const ret = await queryBuilder
           
            //       console.log(ret)
      return queryBuilder;
 }
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

