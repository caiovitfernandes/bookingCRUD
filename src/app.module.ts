import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { BookingModule } from './booking/booking.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [PersonModule, BookingModule, RoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
