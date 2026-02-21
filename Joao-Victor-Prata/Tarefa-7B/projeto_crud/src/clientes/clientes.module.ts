import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesRepository } from './clientes.repository';
import { ClientesController } from './clientes.controller';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientesController],
  providers: [ClientesService, ClientesRepository],
})
export class ClientesModule {}
