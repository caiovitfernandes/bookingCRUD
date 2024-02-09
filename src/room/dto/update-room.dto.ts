import { PartialType } from "@nestjs/mapped-types";
import { CreateRoomDto } from "./create-room.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class UpdateRoomDto {
    @ApiProperty({ required: false})
    @IsNumber()
    @IsOptional()
    number?: number;

    @ApiProperty({ required: false})
    @IsNumber()
    @IsOptional()
    capacity?: number;
}