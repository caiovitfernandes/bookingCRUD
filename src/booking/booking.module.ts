import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { bookingProviders } from './providers/booking.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule,],
    controllers: [BookingController],
    providers:  [BookingService, ...bookingProviders],
})
export class BookingModule {}
