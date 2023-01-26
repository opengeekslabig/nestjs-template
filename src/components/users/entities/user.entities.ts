import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { CredentialsEntities } from '../../authentication/entities/credentials.entities';

@Table({
  tableName: 'users_schema',
  paranoid: true,
  indexes: [{ fields: ['id'] }],
})
export class UserEntities extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({ unique: true })
  login: string;

  @ForeignKey(() => CredentialsEntities)
  @Column({
    type: DataType.UUID,
  })
  credentialsId: string;

  @BelongsTo(() => CredentialsEntities, {
    foreignKey: 'credentialsId',
    onDelete: 'CASCADE',
    hooks: true,
  })
  credentials: CredentialsEntities;
}
