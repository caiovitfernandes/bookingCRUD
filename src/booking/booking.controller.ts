import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { FindBookingByDateDto } from './dto/find-booking-by-date.dto';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ResultDto } from 'src/dto/result.dto';

@Controller('bookings')
export class BookingController {
    constructor(private readonly bookingService : BookingService){}
    @Get('list')
    async list() : Promise<Booking[]>{
        return this.bookingService.list()
    }

    @Get('byroom/:roomId')
    async byRoom(@Param('roomId') roomId : number) : Promise<Booking[]>{
        return this.bookingService.byRoom(roomId)
    }

    @Get('byperson/:personId')
    async byPerson(@Param('personId') personId : number) : Promise<Booking[]>{
        return this.bookingService.byPerson(personId)
    }

    @Post()
    async create(@Body() createBookingDto : CreateBookingDto): Promise<ResultDto>{
        return this.bookingService.create(createBookingDto)
    }

    @Post('find')
    async findBookingInDate(@Body() findBookingByDateDto : FindBookingByDateDto) : Promise<Booking[]>{
        return this.bookingService.foundBookingInDate(findBookingByDateDto)
    }

    @Patch('cancel/:id')
    async cancel(@Param('id') id: number) : Promise<ResultDto>{
        return this.bookingService.cancel(id)
    }
}
