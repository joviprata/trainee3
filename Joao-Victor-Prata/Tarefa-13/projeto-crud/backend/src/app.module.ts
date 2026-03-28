import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudosModule } from './estudos/estudos.module';
import { ProvasModule } from './provas/provas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pg123',
      database: 'projeto_estudar',
      autoLoadEntities: true,
      synchronize: false,
    }),
    EstudosModule,
    ProvasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
