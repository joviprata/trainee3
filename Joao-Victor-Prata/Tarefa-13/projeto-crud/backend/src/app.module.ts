import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudosModule } from './estudos/estudos.module';
import { Estudo } from './estudos/entities/estudo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pg123',
      database: '',
      entities: [Estudo],
      synchronize: true,
    }),
    EstudosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
