import { BadRequestException, Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { ResultDto } from 'src/dto/result.dto';

@Injectable()
export class PersonService {
    constructor(
        @Inject('PERSON_REPOSITORY')
        private personRepository: Repository<Person>,
    ){}
    
    // GETS
    async list(): Promise<Person[]>{
        try {
            return await this.personRepository.find()
        } catch (error) {
            throw new BadRequestException(`${error}`)
        }
    }

    async findOne(id : number) : Promise<Person>{
        const person = await this.personRepository.findOne({ where: { id } });
        if(!person){
            throw new NotFoundException(`Person with id ${id} not found on database.`)
        }
        return person
    }

    //POSTS
    async create(createPersonDto : CreatePersonDto): Promise<ResultDto>{
        let person = new Person()
        person.name = createPersonDto.name
        person.dateOfBirth = new Date(createPersonDto.dateOfBirth)
        person.cpf = createPersonDto.cpf

        try {
            this.personRepository.save(person)
            return <ResultDto>{
                status: true,
                message: `Success to register person: ${person.name}`
            }
        } catch (error) {
            return <ResultDto>{
                status: false,
                message: `${error}`
            }
        }
    }

    //PATCHS
    async update(id, body) : Promise<ResultDto>{
        const person = await this.personRepository.findOne({ where: { id } });
        if(!person){
            throw new NotFoundException(`Person with id ${id} not found on database.`)
        }
        
        this.personRepository.merge(person, body);
        await this.personRepository.save(person)

        return <ResultDto>{
            status: true,
            message: `Person id: ${id} sucessfully changed`
        }
    }

    //DELETES   
    async remove(id) : Promise<ResultDto>{
        const person = await this.personRepository.findOne({ where: { id } });
        if(!person){
            throw new NotFoundException(`Person with id ${id} not found on database.`)
        }
        
        await this.personRepository.remove(person)

        return <ResultDto>{
            status: true,
            message: `Person id: ${id} sucessfully removed`
        }
    }
}
