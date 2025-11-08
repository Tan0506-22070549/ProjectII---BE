import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './movie/movie.module';
import { AuthModule } from './modules/auth/auth.module';
import { ScreenModule } from './screen/screen.module';
import { SeatsModule } from './seats/seats.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    MovieModule,
    AuthModule,
    ScreenModule,
    SeatsModule,
  ],
})
export class AppModule {}
