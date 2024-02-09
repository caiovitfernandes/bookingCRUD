import { Transform } from "class-transformer";
import { IsDate, IsString } from "class-validator";

export class CreatePersonDto{
    @IsString()
    name : string;

    @IsDate()
    @Transform(({ value }) => new Date(value))
    dateOfBirth: Date;

    @IsString()
    cpf: string;
}