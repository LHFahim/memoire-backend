import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@typegoose/typegoose';
import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Model } from 'libraries/mongodb/modelOptions';
import { Types } from 'mongoose';
import { DocumentWithTimeStamps } from 'src/common/classes/documentWithTimeStamps';

@Model('habits', true)
export class HabitTrackerEntity extends DocumentWithTimeStamps {
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
  description: string;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @Prop({ required: false, trim: true })
  timezone?: string;

  @Expose()
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ required: true, type: Date })
  @Prop({ required: false, type: Date })
  firstStartedAt: Date;

  @Expose()
  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false, type: Date })
  @Prop({ required: false, type: Date, default: null })
  lastCheckInDate?: Date;

  @Expose()
  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false, type: Date })
  @Prop({ required: false, type: Date, default: null })
  lastStartedAt?: Date;

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
