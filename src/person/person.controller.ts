import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { PersonService } from './person.service';
import { ResultDto } from 'src/dto/result.dto';
import { CreatePersonDto } from './dto/create-person.dto';
import { Person } from './entities/person.entity';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('persons')
export class PersonController {
    constructor(private readonly personService : PersonService){}

    @Get('list')
    async list(): Promise<Person[]>{
        return this.personService.list()
    }

    @Get(':id')
    async findOne(@Param('id') id : number): Promise<Person>{
        return this.personService.findOne(id)
    }

    @Post()
    async create(@Body() createPersonDto : CreatePersonDto): Promise<ResultDto>{
        return this.personService.create(createPersonDto)
    }

    @Patch(':id')
    async update(@Param('id') id : number, @Body() updatePersonDto : UpdatePersonDto) : Promise<ResultDto>{
        return this.personService.update(id, updatePersonDto)
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<ResultDto>{
        return this.personService.remove(id)
    }
}
