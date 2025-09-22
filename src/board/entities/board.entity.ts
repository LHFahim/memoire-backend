import { ApiProperty } from '@nestjs/swagger';
import { Prop, Ref } from '@typegoose/typegoose';
import { Expose, Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Model } from 'libraries/mongodb/modelOptions';
import { DocumentWithTimeStamps } from 'src/common/classes/documentWithTimeStamps';
import { UserEntity } from 'src/user/entities/user.entity';
import { BoardVisibilityEnum } from './board.enums';

export class BoardSettingsEntity {
  @Expose()
  @IsBoolean()
  @IsOptional()
  @Prop({ required: false, type: Boolean, default: true })
  isCommentsEnabled?: boolean;

  @Expose()
  @IsBoolean()
  @IsOptional()
  @Prop({ required: false, type: Boolean, default: true })
  isAttachmentsEnabled?: boolean;
}

@Model('boards', true)
export class BoardEntity extends DocumentWithTimeStamps {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Prop({ required: true, trim: true })
  name: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Prop({ required: true, trim: true })
  description: string;

  @Expose()
  @IsEnum(BoardVisibilityEnum)
  @ApiProperty({
    enum: BoardVisibilityEnum,
    required: true,
    default: BoardVisibilityEnum.PRIVATE,
  })
  @Prop({
    enum: BoardVisibilityEnum,
    required: true,
    default: BoardVisibilityEnum.PRIVATE,
  })
  visibility: BoardVisibilityEnum;

  @Expose()
  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({ required: false, type: [String] })
  @Prop({ required: false, type: [String], default: [] })
  members?: string[];

  @Expose()
  @IsOptional()
  @Prop({ required: false, default: {}, _id: false, type: Object })
  @ApiProperty({ required: false, type: () => BoardSettingsEntity })
  settings?: BoardSettingsEntity;

  @Expose()
  @IsBoolean()
  @IsNotEmpty()
  @Prop({ required: false, type: Boolean, default: true })
  isActive: boolean;

  @Expose()
  @IsBoolean()
  @IsNotEmpty()
  @Prop({ required: false, type: Boolean, default: false })
  isDeleted: boolean;

  @Expose()
  @IsMongoId()
  @Type(() => UserEntity)
  @Prop({ required: true, ref: () => UserEntity })
  @ApiProperty({ required: false, type: () => UserEntity })
  @Transform(({ value }) => value._id.toString(), { toPlainOnly: true })
  createdBy: Ref<UserEntity>;
}
