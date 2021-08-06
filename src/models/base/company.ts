import {Entity,Column,PrimaryGeneratedColumn, ManyToOne,JoinColumn} from 'typeorm';

@Entity('company')
export default class Company {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({length: 50, nullable:true })
    code?:string;

    @Column({length: 50, nullable:false })
    name:string;

    @Column({length: 50, nullable:true })
    website?:string;
    
    @Column({length: 50, nullable:true })
    address?:string;

    @Column({length: 20, nullable:true })
    vat?:string;

    @Column({length: 50, nullable:true })
    province?: string;
    
    @Column({length: 20, nullable:true })
    phoneNumber:string;

    @Column({length: 20, nullable:true })
    cellphone:string;

    @Column({length: 100, nullable:true })
    email:string;

    @Column({length: 20, nullable:true })
    status?:string;

    @Column({length: 100, nullable:true })
    notes?:string;

    @Column()
    json?:string;
}