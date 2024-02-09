import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateRoomDto{
    @ApiProperty()
    @IsNumber()
    number: number;

    @ApiProperty()
    @IsNumber()
    capacity: number;
}