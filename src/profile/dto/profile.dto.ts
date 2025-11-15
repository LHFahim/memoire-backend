import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';

export class ProfileDto extends PickType(UserEntity, [
  'firstName',
  'lastName',
  'email',
  'phone',
  'avatarURL',
  'isEmailVerified',
  'createdAt',
]) {}

export class UpdateProfileDto extends PickType(UserEntity, [
  'firstName',
  'lastName',
]) {}
