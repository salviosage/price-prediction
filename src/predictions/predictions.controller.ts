import {
  Body,
  Delete,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/auth/auth.decorator';
import { RequiredAuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from 'src/users/entities/user.entity';
import { PredictionEntity } from './entities/prediction.entity';
import { PredictionsService } from './predictions.service';

class PredictionCreateRequestBody {
  @ApiProperty() distance: number;
  @ApiPropertyOptional()from:string;
  @ApiProperty() to: string;
 
}

class PredictionDetailsQueryParams {
  // @ApiPropertyOptional() authorId: string;
  // @ApiPropertyOptional() toDate: Date;
  // @ApiPropertyOptional() fromDate: Date;
  // @ApiPropertyOptional() hashtags: string[];
}

@ApiTags('predictions')
@Controller('predictions')
export class PredictionsController {
  constructor(private readonly predictionsService: PredictionsService) {}
  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Get('/')
  async getAllPredictions(
    @User() client: UserEntity,
    @Query() query: PredictionDetailsQueryParams,
  ): Promise<PredictionEntity[]> {
    return await this.predictionsService.getAllPredictions(client);
  }
  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Get('/me')
  async getMyPredictions(
    @User() client: UserEntity,
    @Query() query: PredictionDetailsQueryParams,
  ): Promise<PredictionEntity[]> {
    return await this.predictionsService.getMyPredictions(client);
  }
  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Get('/analytics')
  async getPredictionsStats(
    @User() client: UserEntity,
    @Query() query: PredictionDetailsQueryParams,
  ): Promise<Number> {
    return await this.predictionsService.getPredictionsStats(client);
  }
  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Get('/:predictionId')
  async getPredictionDetails(
    @User() client: UserEntity,
    @Param('predictionId') predictionId: string,
  ): Promise<PredictionEntity> {
    return await this.predictionsService.getPrediction(predictionId,client);
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Post('/')
  async createNewPrediction(
    @User() client: UserEntity,
    @Body() prediction: PredictionCreateRequestBody,
  ): Promise<{message:String,data:{
    from: string,
    to: string,
    vehicle: string,
    price: string
}[],entity:PredictionEntity}> {
    const createdPrediction = await this.predictionsService.createPrediction(prediction, client);
    return createdPrediction;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Delete('/:predictionid')
  async deletePrediction(@User() client: UserEntity,@Param('predictionid') predictionid: string): Promise<boolean> {
    return await this.predictionsService.deletePrediction(predictionid,client);
  }
}
