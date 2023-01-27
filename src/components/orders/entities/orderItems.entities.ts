import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { OrderEntities } from '@components/orders/entities/orders.entities';
import { ProductEntities } from '@components/products/entities/product.entities';

@Table({
  tableName: 'ordersItems',
})
export class OrderItemsEntities extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => OrderEntities)
  @Column({
    type: DataType.UUID,
  })
  orderId: string;

  @ForeignKey(() => ProductEntities)
  @Column({
    type: DataType.UUID,
  })
  productId: string;

  @BelongsTo(() => OrderEntities, 'orderId')
  order: OrderEntities;

  @BelongsTo(() => ProductEntities, 'productId')
  product: ProductEntities;
}
