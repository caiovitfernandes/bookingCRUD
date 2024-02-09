import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { FindBookingByDateDto } from './dto/find-booking-by-date.dto';
import { ResultDto } from 'src/dto/result.dto';
import { CreateBookingDto } from './dto/create-booking.dto';


@Injectable()
export class BookingService {
    constructor(
        @Inject('BOOKING_REPOSITORY')
        private bookingRepository : Repository<Booking>
    ){}
    
    //GETS
    async list() : Promise<Booking[]>{
        try {
            return this.bookingRepository.find({relations : ['persons', 'room'],})
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async byRoom(roomId) : Promise<Booking[]>{
        let response = []
        const allBookings = await this.list()
        allBookings.forEach(booking =>{
            if(booking.room.id === roomId){
                response.push(booking)
            }
        })
        if(response.length === 0){
            throw new NotFoundException(`No bookings found for room id: ${roomId}`)
        }
        return response
    }

    async byPerson(personId) : Promise<Booking[]>{
        let response = []
        const allBookings = await this.list()
        allBookings.forEach(booking =>{
            booking.persons.forEach(person =>{
                if(person.id === personId){
                    response.push(booking)
                }
            })
        })
        if(response.length === 0){
            throw new NotFoundException(`No bookings found for person id: ${personId}`)
        }
        return response
    }

    //POST
    async create(body : CreateBookingDto) : Promise<ResultDto>{
        let booking = new Booking()
        booking.additionalInformation = body.additionalInformation
        booking.bookingFor = body.bookingFor
        booking.persons = body.persons
        booking.room = body.room

        try {
            this.bookingRepository.save(booking)
            return <ResultDto>{
                status: true,
                message: `Success to register booking: room: ${booking.room.number}, day: ${booking.bookingFor.getUTCDate()}/${booking.bookingFor.getUTCMonth()}`
            }
        } catch (error) {
            return <ResultDto>{
                status: false,
                message: `${error}`
            }
        }
    }
    
    async foundBookingInDate(body : FindBookingByDateDto) : Promise<Booking[]>{
        let dateToFound = new Date(body.date)
        const bookingsFound = await this.bookingRepository.find({ where : { bookingFor: dateToFound }, relations: ['persons', 'room'] });
        if(!bookingsFound){
            return<Booking[]>[]
        }
        return bookingsFound
    }

    //PATCHS
    async cancel(id) : Promise<ResultDto>{
        const booking = await this.bookingRepository.findOne({where : {id : id}})
        let bookingCanceled = booking
        bookingCanceled.status = 'canceled'

        try {
            this.bookingRepository.merge(booking, bookingCanceled)
            await this.bookingRepository.save(booking)
        } catch (error) {
            throw new BadRequestException(error)
        }
        return <ResultDto>{
            status: true,
            message: `Booking id ${id} sucessfully canceled`
        }
        
    }
}
