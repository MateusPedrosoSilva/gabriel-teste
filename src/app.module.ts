import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST_PROD,
      port: parseInt(process.env.PG_PORT_PROD),
      database: process.env.PG_DATABASE_PROD,
      username: process.env.PG_USER_PROD,
      password: process.env.PG_PASSWORD_PROD,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST_TEST,
      port: parseInt(process.env.PG_PORT_TEST),
      database: process.env.PG_DATABASE_TEST,
      username: process.env.PG_USER_TEST,
      password: process.env.PG_PASSWORD_TEST,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
