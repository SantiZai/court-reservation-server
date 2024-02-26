import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // enabling swagger for document the API
  const config = new DocumentBuilder()
    .setTitle("Courts reservations web app")
    .setDescription("The courts reservations API web")
    .setVersion("1.0")
    .addTag("sports")
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document)

  // enable cors for client requests
  // TODO: accept petitions for urls verifieds
  app.enableCors()

  await app.listen(5000);
}
bootstrap();
