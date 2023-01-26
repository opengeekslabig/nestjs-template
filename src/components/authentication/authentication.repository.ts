import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CredentialsEntities } from '@components/authentication/entities/credentials.entities';

@Injectable()
export class AuthenticationRepository {
  constructor(
    @InjectModel(CredentialsEntities)
    private readonly authModel: typeof CredentialsEntities,
  ) {}
  updateRefreshToken(credentialId: string, hashedToken: string) {
    return this.authModel.update(
      { refreshToken: hashedToken },
      { where: { id: credentialId } },
    );
  }
}
