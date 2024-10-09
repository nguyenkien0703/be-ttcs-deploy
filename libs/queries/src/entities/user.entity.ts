import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Role } from './role.entity'

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        name: 'email',
        type: 'varchar',
        length: 255,
        nullable: true,
        unique: true,
    })
    email: string

    @Column({ name: 'password', type: 'varchar', length: 255, nullable: true })
    password: string

    @Column({
        name: 'name',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name: string

    @Column({
        name: 'address',
        type: 'text',
        nullable: true,
    })
    address: string

    @Column({
        nullable: true,
        name: 'phone',
        type: 'varchar',
        length: 255,
    })
    phone: string

    @Column({
        name: 'reset_password_token',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    resetPasswordToken: string

    @Column({
        nullable: true,
        name: 'reset_password_expire_time',
    })
    resetPasswordExpireTime: Date

    @Column({ nullable: false, name: 'role_id', type: 'integer', width: 11 })
    roleId: number

    @ManyToOne(() => Role)
    @JoinColumn({
        name: 'role_id',
    })
    role: Role
}
