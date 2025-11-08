import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cho phép Frontend (Next.js port 3001) truy cập
  app.enableCors({
    origin: [
      process.env.CORS_ORIGIN || 'http://localhost:3001',
      'http://192.168.102.252:3001', // nếu test qua IP LAN
    ],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Movie Ticket API')
    .setDescription('API for movie ticket management system')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Lắng nghe cổng backend
  const port = Number(process.env.LISTEN_PORT) || 3000;
  await app.listen(port);

  console.log(`✅ Server running on http://localhost:${port}`);
  console.log(`✅ Swagger available at http://localhost:${port}/api`);
}

bootstrap();
