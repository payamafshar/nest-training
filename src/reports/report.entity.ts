import UserEntity from 'src/users/user.entity'
import { Column , PrimaryGeneratedColumn , Entity ,ManyToOne} from 'typeorm'

@Entity()
export default class ReportsEntity {
@PrimaryGeneratedColumn()
id:number

@Column()
price:number
@Column()
mileage:number
@Column({default:false})
approve :boolean
@Column()

model:string
@Column()
make:number




@ManyToOne( () => UserEntity , (user) => user.report )
    user:UserEntity
}