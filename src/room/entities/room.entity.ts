import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Room{
    @PrimaryGeneratedColumn({})
    id : number;

    @Column({
        unique: true,
        nullable: false
    })
    number: number;

    @Column({
        nullable: false
    })
    capacity: number
}