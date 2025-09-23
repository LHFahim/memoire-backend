import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@typegoose/typegoose';
import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Model } from 'libraries/mongodb/modelOptions';
import { Types } from 'mongoose';
import { DocumentWithTimeStamps } from 'src/common/classes/documentWithTimeStamps';
import {
  ReflectionMoodEnum,
  ReflectionVisibilityEnum,
} from './reflection.enum';

@Model('reflections', true)
export class ReflectionEntity extends DocumentWithTimeStamps {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Prop({ required: true, trim: true })
  title: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Prop({ required: true, trim: true })
  content: string;

  @Expose()
  @IsMongoId()
  @Type(() => String)
  @Prop({ required: true, ref: 'boards' })
  @ApiProperty({ required: true, type: String })
  board: Types.ObjectId;

  @Expose()
  @IsEnum(ReflectionVisibilityEnum)
  @ApiProperty({
    enum: ReflectionVisibilityEnum,
    required: true,
    default: ReflectionVisibilityEnum.PRIVATE,
  })
  @Prop({
    enum: ReflectionVisibilityEnum,
    required: true,
    default: ReflectionVisibilityEnum.PRIVATE,
  })
  visibility: ReflectionVisibilityEnum;

  @Expose()
  @IsOptional()
  @IsEnum(ReflectionMoodEnum)
  @ApiProperty({
    enum: ReflectionMoodEnum,

    default: ReflectionMoodEnum.NEUTRAL,
  })
  @Prop({
    enum: ReflectionMoodEnum,

    default: ReflectionMoodEnum.NEUTRAL,
  })
  mood?: ReflectionMoodEnum;

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
  @Type(() => String)
  @Prop({ required: true, ref: 'users' })
  @ApiProperty({ required: true, type: String })
  createdBy: Types.ObjectId;
}
