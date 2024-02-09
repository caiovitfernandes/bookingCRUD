import { Transform } from "class-transformer";
import { IsArray, IsDate, IsObject, IsString } from "class-validator";
import { Person } from "src/person/entities/person.entity";
import { Room } from "src/room/entities/room.entity";

export class CreateBookingDto{
    @IsObject()
    room : Room;

    @IsArray()
    persons : Person[];

    @IsDate()
    @Transform(({value}) => new Date(value))
    bookingFor : Date;

    @IsString()
    additionalInformation?: string
}