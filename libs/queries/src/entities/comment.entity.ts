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
import { User } from '@app/queries/entities/user.entity'
import { Laptop } from '@app/queries/entities/laptop.entity'

@Entity('comments')
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        name: 'content',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    content: string

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

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date
}
