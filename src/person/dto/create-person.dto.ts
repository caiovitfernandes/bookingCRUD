import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsString } from "class-validator";

export class CreatePersonDto{
    @ApiProperty()
    @IsString()
    name : string;

    @ApiProperty()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    dateOfBirth: Date;

    @ApiProperty()
    @IsString()
    cpf: string;
}