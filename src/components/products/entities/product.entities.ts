import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

@Table({
  tableName: 'products',
})
export class ProductEntities extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column
  name: string;

  @Column
  price: number;
}
