import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import ServicePayment from './servicePayment';

@Entity('servicePaymentLine')
export default class ServicePaymentLine {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ length: 50, nullable: false })
    reference?: string;

    @Column({ nullable: false })
    date?: Date;

    @Column({ length: 50, nullable: false })
    transactionId?: string;

    @Column({ nullable: false })
    amount: number;

    @Column({ nullable: false })
    rate: number;

    @ManyToOne(() => ServicePayment, item => item.id)
    @JoinColumn({ name: 'servicePaymentId' })
    ServicePayment?: ServicePayment

    json?: string;
}