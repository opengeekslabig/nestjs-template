import { Column, DataType, Default, Model, Table } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

@Table({ tableName: 'credentials' })
export class CredentialsEntities extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Default(null)
  @Column
  refreshToken?: string;

  @Column
  password: string;
}
