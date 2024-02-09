import { Booking } from "src/booking/entities/booking.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Person {
    @PrimaryGeneratedColumn({})
    id: number;

    @Column({ 
        length: 70,
        nullable: false
    })
    name: string;

    @Column({
        nullable: true
    })
    dateOfBirth: Date;

    @Column({ 
        length: 11,
        unique: true,
        nullable: false
    })
    cpf: string;

    @ManyToMany(() => Booking, booking => booking.persons)
    @JoinTable()
    bookings: Booking[];
}