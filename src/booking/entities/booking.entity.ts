import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, ManyToMany, PrimaryColumn } from "typeorm";
import { Room } from "src/room/entities/room.entity";
import { Person } from "src/person/entities/person.entity";

@Entity()
export class Booking{
    @PrimaryGeneratedColumn({})
    id: number;

    @Column({
        length: 8,
        default: 'active'
    })
    status: string;
    

    @ManyToOne(() => Room, room => room.id)
    @JoinColumn({ name: 'roomId'})
    room : Room

    @ManyToMany(() => Person, person => person.bookings)
    persons: Person[];

    @Column({
        nullable: false
    })
    bookingFor: Date;

    @Column({
        default: () => 'GETDATE()',
    })
    bookingIn: Date;

    @Column({
        length: 200,
        nullable: true
    })
    additionalInformation: string;
}