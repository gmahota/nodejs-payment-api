import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('banks')
export default class Bank {
    @PrimaryColumn({ length: 20 })
    code: string;

    @Column({ length: 50, nullable: false })
    name: string;

    @Column({ length: 50, nullable: true })
    website?: string;

    @Column({ length: 50, nullable: true })
    notes?: string;

    @Column({ length: 50, nullable: true })
    address?: string;

    @Column({ length: 20, nullable: true })
    vat?: string;

    @Column({ length: 50, nullable: true })
    province?: string;

    @Column({ length: 20, nullable: true })
    phoneNumber?: string;

    @Column({ length: 20, nullable: true })
    cellphone?: string;

    @Column({ length: 100, nullable: true })
    email?: string;

    @Column()
    status?: string;

    @Column()
    json?: string;
}