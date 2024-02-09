import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsDate, IsObject, IsString } from "class-validator";
import { Person } from "src/person/entities/person.entity";
import { Room } from "src/room/entities/room.entity";

export class CreateBookingDto{
    @ApiProperty()
    @IsObject()
    room : Room;

    @ApiProperty()
    @IsArray()
    persons : Person[];

    @ApiProperty()
    @IsDate()
    @Transform(({value}) => new Date(value))
    bookingFor : Date;

    @ApiProperty()
    @IsString()
    additionalInformation?: string
}