import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class seedCustomers1628260312714 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'customers',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned:true,
                    isPrimary:true,
                    isGenerated:true,
                    generationStrategy:'increment'
                },
                {
                    name: 'code',
                    type: 'varchar(50)',
                    isNullable: true
                },
                {
                    name: 'name',
                    type: 'varchar(50)'
                },
                {
                    name: 'website',
                    type: 'varchar(50)',
                    isNullable: true
                }, {
                    name: 'notes',
                    type: 'varchar(100)',
                    isNullable: true
                }, {
                    name: 'address',
                    type: 'varchar(50)',
                    isNullable: true
                }, {
                    name: 'vat',
                    type: 'varchar(50)',
                    isNullable: true
                }, {
                    name: 'province',
                    type: 'varchar(50)',
                    isNullable: true
                }, {
                    name: 'phoneNumber',
                    type: 'varchar(20)',
                    isNullable: true
                }, 
                {
                    name: 'cellphone',
                    type: 'varchar(20)',
                    isNullable: true
                },                
                {
                    name: 'email',
                    type: 'varchar(100)',
                    isNullable: true
                }, {
                    name: 'status',
                    type: 'varchar(20)',
                    isNullable: true
                }, {
                    name: 'json',
                    type: 'text',
                    isNullable: true
                },
                {
                    name:'companyId',
                    type:'integer',
                    isNullable: true
                }
            ],
            foreignKeys:[
                {
                    name:'CustomerCompanies',
                    columnNames:['companyId'],
                    referencedTableName:'company',
                    referencedColumnNames:['id'],
                    onUpdate:'CASCADE',
                    onDelete:'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("customers");
    }

}
