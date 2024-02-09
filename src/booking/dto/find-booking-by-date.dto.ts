import { Transform } from "class-transformer";
import { IsDate } from "class-validator";

export class FindBookingByDateDto{
    @IsDate()
    @Transform(({ value }) => new Date(value))
    date: Date
}