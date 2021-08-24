import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import ServicePaymentLine from "./servicePaymentLine"

@Entity('servicePayment')
export default class ServicePayment {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ length: 100, nullable: true })
    entity?: string;

    @Column({ length: 100, nullable: false })
    fileName?: string;

    @Column()
    total: number;

    @Column()
    totalRate: number;

    @OneToMany(() => ServicePaymentLine, item => item.ServicePayment, {
        cascade: ['insert', 'update']
    })
    items?: ServicePaymentLine[]

    json?: string;
}