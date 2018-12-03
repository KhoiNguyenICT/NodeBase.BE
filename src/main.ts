import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const hostDomain = AppModule.isDev ? `${AppModule.host}:${AppModule.port}`: AppModule.host
  console.log(AppModule.host)

  const swaggerOptions = new DocumentBuilder()
    .setTitle('VNU Api Document')
    .setDescription('VNU Api Document')
    .setVersion('1.0.0')
    .setHost(hostDomain.split('//')[1])
    .setSchemes(AppModule.isDev ? 'http': 'https')
    .setBasePath('/api')
    .addBearerAuth('Authorization', 'header')
    .build()

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions)

  app.use('/api/docs/swagger.json', (req, res) => {
    res.send(swaggerDoc)
  })

  SwaggerModule.setup('/api/docs', app, null, {
    swaggerUrl: `${hostDomain}/api/docs/swagger.json`,
    explorer: true,
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true
    }
  })

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  app.setGlobalPrefix('api')

  await app.listen(AppModule.port).then(() => {
    console.log(`Server is running on port: ${AppModule.port}`)
  });
}
bootstrap();
