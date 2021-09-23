import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('SMART LOGISTICS PRICING MODEL SAAS')
    .setDescription('ASMART LOGISTICS PRICING MODEL SAAS enable small holder farmers, small businesses ,e-commerce and vendors transporting their products seamlessly, affordably and conveniently. by helping them in pricing processs whereby this machine learning model help them predict price of moving goods from one place to another. this model is able to learn from previous pricing, feedback and market research to serve better for future request')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'Token',
    })
    .setVersion('1.0')
    .addTag('SMART LOGISTIC SAAS API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
