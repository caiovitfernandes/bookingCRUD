import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class UpdatePersonDto {
    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    name : string;

    @ApiProperty({required: false})
    @IsOptional()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    dateOfBirth: Date;

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    cpf: string;
}