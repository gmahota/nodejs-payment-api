import {Entity,Column,PrimaryColumn,PrimaryGeneratedColumn, ManyToOne,JoinColumn} from 'typeorm';
import Company from '../base/company';
import Customer from '../base/customer';

@Entity('reference')
export default class customerReference {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({length: 50, nullable:false })
    code?:string;       

    @Column({length: 50, nullable:true })
    status?:string;

    @ManyToOne(()=> Customer, item => item.id)
    @JoinColumn({name:'customerId'})
    Customer?:Customer;

    @ManyToOne(()=> Company, item => item.id)
    @JoinColumn({name:'companyId'})
    Company?:Company;

    @Column({nullable:true })
    json?:string;
}