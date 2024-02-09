import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { DatabaseModule } from 'src/database/database.module';
import { personProviders } from './providers/person.providers';

@Module({
    imports: [DatabaseModule,],
    controllers: [PersonController],
    providers: [PersonService, ...personProviders]
})
export class PersonModule {}
