import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { Laptop } from './laptop.entity'
import { User } from './user.entity'
import { Order } from './order.entity'

@Entity('order_details')
export class OrderDetail extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, name: 'laptop_id', type: 'integer', width: 11 })
    laptopId: number

    @ManyToOne(() => Laptop)
    @JoinColumn({
        name: 'laptop_id',
    })
    laptop: Laptop

    @Column({ nullable: false, name: 'user_id', type: 'integer', width: 11 })
    userId: number

    @Column({ nullable: false, name: 'quantity', type: 'integer', width: 11 })
    quantity: number

    @ManyToOne(() => User)
    @JoinColumn({
        name: 'user_id',
    })
    user: User

    @Column({ nullable: false, name: 'order_id', type: 'integer', width: 11 })
    orderId: number

    @ManyToOne(() => Order)
    @JoinColumn({
        name: 'order_id',
    })
    order: Order

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date
}
