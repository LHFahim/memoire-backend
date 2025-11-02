import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@typegoose/typegoose';
import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Model } from 'libraries/mongodb/modelOptions';
import { Types } from 'mongoose';
import { DocumentWithTimeStamps } from 'src/common/classes/documentWithTimeStamps';

@Model('habit-sessions', true)
export class HabitSessionEntity extends DocumentWithTimeStamps {
  @Expose()
  @IsMongoId()
  @Type(() => String)
  @Prop({ required: true, ref: 'habits' })
  @ApiProperty({ required: true, type: String })
  habitId: Types.ObjectId;

  @Expose()
  @IsMongoId()
  @Type(() => String)
  @Prop({ required: true, ref: 'users' })
  @ApiProperty({ required: true, type: String })
  userId: Types.ObjectId;

  @Expose()
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ required: true, type: Date })
  @Prop({ required: false, type: Date })
  startedAt: Date;

  @Expose()
  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false, type: Date })
  @Prop({ required: false, type: Date, default: null })
  endedAt?: Date;

  @Expose()
  @IsOptional()
  @ApiProperty({ required: false, type: Number })
  @Prop({ required: false, type: Number, default: null })
  durationInHours?: number;

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
}
