import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
@Entity('laptops')
export class Laptop extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        name: 'name',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name: string

    @Column({
        name: 'cpu',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    cpu: string

    @Column({
        name: 'ram',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    ram: string

    @Column({
        name: 'screen',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    screen: string

    @Column({
        name: 'color',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    color: string

    @Column({
        name: 'os',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    os: string

    @Column({
        name: 'storage',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    storage: string

    @Column({
        name: 'graphic_card',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    graphicCard: string

    @Column({
        name: 'description',
        type: 'text',
        nullable: true,
    })
    description: string

    @Column({
        name: 'pin',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    pin: string

    @Column({ nullable: false, name: 'price', type: 'integer', width: 11 })
    price: number

    @Column({ nullable: false, name: 'sale', type: 'integer', width: 11 })
    sale: number

    @Column({
        name: 'material',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    material: string

    @Column({
        name: 'brand',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    brand: string

    @Column({
        name: 'image',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    image: string

    @Column({ nullable: false, name: 'quantity', type: 'integer', width: 11 })
    quantity: number
}
