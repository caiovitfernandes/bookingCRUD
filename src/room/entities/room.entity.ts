import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Room{
    @ApiProperty()
    @PrimaryGeneratedColumn({})
    id : number;

    @ApiProperty()
    @Column({
        unique: true,
        nullable: false
    })
    number: number;

    @ApiProperty()
    @Column({
        nullable: false
    })
    capacity: number
}