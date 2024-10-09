import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from '@app/queries/entities/user.entity'
import { Laptop } from '@app/queries/entities/laptop.entity'

@Entity('evalutions')
export class Evalution extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, name: 'rate', type: 'integer', width: 11 })
    rate: number

    @Column({ nullable: false, name: 'user_id', type: 'integer', width: 11 })
    userId: number

    @Column({ nullable: false, name: 'laptop_id', type: 'integer', width: 11 })
    laptopId: number

    @ManyToOne(() => User)
    @JoinColumn({
        name: 'user_id',
    })
    user: User

    @ManyToOne(() => Laptop)
    @JoinColumn({
        name: 'laptop_id',
    })
    laptop: Laptop
}
