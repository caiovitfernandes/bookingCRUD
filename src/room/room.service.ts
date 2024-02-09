import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { ResultDto } from 'src/dto/result.dto';
import { AvaliableRoomDto } from './dto/avaliable-room.dto';
import axios from 'axios';
import { apiUrl } from 'src/utils/api';

@Injectable()
export class RoomService {
    constructor(
        @Inject('ROOM_REPOSITORY')
        private roomRepository: Repository<Room>,
    ){}
    

    //GETS
    async list() : Promise<Room[]>{
        try {
            return this.roomRepository.find()
        } catch (error) {
            throw new BadRequestException(`${error}`)
        }
    }

    async avaliable(body : AvaliableRoomDto) : Promise<Room[]>{
        let rooms = await this.roomRepository.find()

        await axios.post( `${apiUrl}bookings/find`, {date : body.date}).then(response =>{
            if(response.data && response.data.length){
                response.data.forEach(booking =>{
                    if(booking.status === "active"){
                        rooms.splice(rooms.indexOf(booking.room), 1)
                    }
                })
            }
        })
        return rooms
    }

    async find(number) : Promise<Room>{
        let room = await this.roomRepository.findOne({where: {number : number}})

        if(!room){
            throw new NotFoundException(`Room number: ${number} not found`)
        }

        return room
    }

    //POSTS
    async create(body): Promise<ResultDto>{
        let room = new Room()
        room.number = body.number
        room.capacity = body.capacity

        try {
            this.roomRepository.save(room)
            return <ResultDto>{
                status: true,
                message: `Room number ${room.number} sucessfully created`
            }
        } catch (error) {
            return <ResultDto>{
                status: false,
                message: `${error}`
            }
        }
    }

    //PATCHS
    async update(id, body){
        let room = await this.roomRepository.findOne({where : {id : id}})
        if(!room){
            throw new NotFoundException(`Room with id ${id} not found on database.`)
        }
        
        this.roomRepository.merge(room, body);
        await this.roomRepository.save(room)

        return <ResultDto>{
            status: true,
            message: `Room id: ${id} sucessfully changed`
        }
    }

    //DELETES
    async remove(id){
        const room = await this.roomRepository.findOne({ where: { id : id } });
        if(!room){
            throw new NotFoundException(`Room with id ${id} not found on database.`)
        }
        
        await this.roomRepository.remove(room)

        return <ResultDto>{
            status: true,
            message: `Room id: ${id} sucessfully removed`
        }
    }
}
