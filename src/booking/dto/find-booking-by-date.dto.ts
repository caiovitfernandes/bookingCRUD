import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate } from "class-validator";

export class FindBookingByDateDto{
    @ApiProperty()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    date: Date
}