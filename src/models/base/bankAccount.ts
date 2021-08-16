import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Bank from './bank';
import Company from './company'

@Entity('bankAccounts')
export default class BankAccount {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ length: 50, nullable: false })
    code: string;

    @Column({ length: 50, nullable: false })
    name: string;

    @Column({ length: 50, nullable: true })
    number?: string

    @Column({ length: 50, nullable: true })
    nib?: string

    @Column({ length: 50, nullable: true })
    swift?: string

    @Column({ length: 50, nullable: true })
    iban?: string

    @Column({ length: 50, nullable: true })
    accountManager?: string

    @Column({ length: 100, nullable: true })
    accountManagerDetails?: string

    @Column({ length: 50, nullable: true })
    productType?: string

    @Column({ length: 50, nullable: true })
    currency?: string

    @Column({ length: 50, nullable: true })
    branch?: string

    @Column({ nullable: true })
    openingDate?: Date

    @Column({ nullable: true })
    currentBalance?: number

    @ManyToOne(() => Bank, item => item.code)
    @JoinColumn({ name: 'bankCode' })
    Bank?: Bank

    @ManyToOne(() => Company, item => item.code)
    @JoinColumn({ name: 'companyId' })
    Company?: Company

}