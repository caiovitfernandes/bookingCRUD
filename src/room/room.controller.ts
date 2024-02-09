import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { ResultDto } from 'src/dto/result.dto';
import { Room } from './entities/room.entity';
import { AvaliableRoomDto } from './dto/avaliable-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('rooms')
export class RoomController {
    constructor(private readonly roomService : RoomService){}

    @Get('list')
    async list() : Promise<Room[]>{
        return this.roomService.list()
    }

    @Get('avaliable')
    async avaliable(@Body() avaliableRoomDto : AvaliableRoomDto) : Promise<Room[]>{
        return this.roomService.avaliable(avaliableRoomDto)
    }

    @Get('find/:number')
    async find(@Param('number') number : number): Promise<Room>{
        return this.roomService.find(number)
    }

    @Post()
    async create(@Body() createRoomDto : CreateRoomDto) : Promise<ResultDto>{
        return this.roomService.create(createRoomDto)
    }

    @Patch(':id')
    async update(@Param('id') id : number, @Body() updateRoomDto : UpdateRoomDto): Promise<ResultDto>{
        return this.roomService.update(id, updateRoomDto)
    }

    @Delete(':id')
    async remove(@Param('id') id : number) : Promise<ResultDto>{
        return this.roomService.remove(id)
    }
}
