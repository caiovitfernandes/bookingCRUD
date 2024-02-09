import { Transform } from "class-transformer";
import { IsDate } from "class-validator";

export class AvaliableRoomDto{
    @IsDate()
    @Transform(({ value }) => new Date(value))
    date : Date
}