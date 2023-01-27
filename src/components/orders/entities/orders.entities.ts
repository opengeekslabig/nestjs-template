import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { UserEntities } from '@components/users/entities/user.entities';
import { OrderItemsEntities } from '@components/orders/entities/orderItems.entities';

@Table({
  tableName: 'orders',
})
export class OrderEntities extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => UserEntities)
  @Column({
    type: DataType.UUID,
  })
  userId: string;

  @HasMany(() => OrderItemsEntities, { onDelete: 'CASCADE', hooks: true })
  orderItems: OrderItemsEntities[];
}
