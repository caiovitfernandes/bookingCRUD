import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { roomProviders } from './providers/room.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule,],
    controllers: [RoomController],
    providers: [RoomService, ...roomProviders]
})
export class RoomModule {}
