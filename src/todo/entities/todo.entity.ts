import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@typegoose/typegoose';
import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsHexColor,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Model } from 'libraries/mongodb/modelOptions';

import { Types } from 'mongoose';
import { DocumentWithTimeStamps } from 'src/common/classes/documentWithTimeStamps';
import { PriorityEnum, TodoStatusEnum, TodoTypeEnum } from './todo.enum';

@Model('todos', true)
export class TodoEntity extends DocumentWithTimeStamps {
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
  @IsEnum(TodoStatusEnum)
  @ApiProperty({
    required: true,
    enum: TodoStatusEnum,
    default: TodoStatusEnum.PENDING,
  })
  @Prop({
    required: true,
    enum: TodoStatusEnum,
    default: TodoStatusEnum.PENDING,
  })
  status: TodoStatusEnum;

  @Expose()
  @IsEnum(PriorityEnum)
  @ApiProperty({
    required: true,
    enum: PriorityEnum,
    default: PriorityEnum.LOW,
  })
  @Prop({
    required: true,
    enum: PriorityEnum,
    default: PriorityEnum.LOW,
  })
  priority: PriorityEnum;

  @Expose()
  @IsEnum(TodoTypeEnum)
  @ApiProperty({
    required: true,
    enum: TodoTypeEnum,
    default: TodoTypeEnum.PERSONAL,
  })
  @Prop({
    required: true,
    enum: TodoTypeEnum,
    default: TodoTypeEnum.PERSONAL,
  })
  type: TodoTypeEnum;

  @Expose()
  @IsString()
  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false })
  @Prop({ required: false, trim: true })
  dueDate?: string;

  @Expose()
  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({ required: false, type: [String] })
  @Prop({ required: false, type: [String], default: [] })
  attachments?: string[];

  @Expose()
  @IsString()
  @IsOptional()
  @IsHexColor()
  @ApiProperty({ required: false })
  @Prop({ required: false, trim: true })
  color?: string;

  @Expose()
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ required: true, default: false })
  @Prop({ required: true, default: false })
  isPinned: boolean;

  @Expose()
  @IsMongoId()
  @Type(() => String)
  @Prop({ required: true, ref: 'boards' })
  @ApiProperty({ required: true, type: String })
  board: Types.ObjectId;

  @Expose()
  @IsMongoId()
  @Type(() => String)
  @Prop({ required: true, ref: 'users' })
  @ApiProperty({ required: true, type: String })
  createdBy: Types.ObjectId;

  @Expose()
  @IsBoolean()
  @IsNotEmpty()
  @Prop({ required: false, type: Boolean, default: true })
  isActive: boolean;

  @Prop({ required: false, type: Boolean, default: false })
  @Expose()
  @IsBoolean()
  @IsNotEmpty()
  isDeleted: boolean;
}
