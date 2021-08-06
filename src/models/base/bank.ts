import {Entity,Column,PrimaryColumn,PrimaryGeneratedColumn, ManyToOne,JoinColumn} from 'typeorm';


@Entity('banks')
export default class Bank {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({length: 50, nullable:false })
    code:string;   

    @Column({length: 50, nullable:false })
    description:string;

    @Column({length: 50, nullable:false })
    website:string;

    @Column({length: 50, nullable:false })
    notes:string;

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

    @Column()
    status?:string;

    @Column()
    json?:string;
}