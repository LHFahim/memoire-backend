import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { BoardEntity } from 'src/board/entities/board.entity';
import {
  CreateReflectionDto,
  ReflectionDto,
  ReflectionPaginatedDto,
  ReflectionQueryDto,
  UpdateReflectionDto,
} from './dto/reflection.dto';
import { ReflectionEntity } from './entities/reflection.entity';
import {
  ReflectionMoodEnum,
  ReflectionVisibilityEnum,
} from './entities/reflection.enum';

@Injectable()
export class ReflectionService extends SerializeService<ReflectionEntity> {
  constructor(
    @InjectModel(ReflectionEntity)
    private readonly reflectionModel: ReturnModelType<typeof ReflectionEntity>,
    @InjectModel(BoardEntity)
    private readonly boardModel: ReturnModelType<typeof BoardEntity>,
  ) {
    super(ReflectionEntity);
  }

  async onModuleInit() {
    console.log('ReflectionService initialized');
  }

  async createReflection(userId: string, body: CreateReflectionDto) {
    const boardExists = await this.boardModel.findOne({
      _id: body.board,
      createdBy: userId,
      isDeleted: false,
    });
    if (!boardExists) throw new NotFoundException('Board not found');

    const doc = await this.reflectionModel.create({
      ...body,
      board: new Types.ObjectId(body.board),
      mood: ReflectionMoodEnum.NEUTRAL,
      visibility: ReflectionVisibilityEnum.PRIVATE,
      createdBy: userId,
      isActive: true,
      isDeleted: false,
    });

    return this.toJSON(doc, ReflectionDto);
  }

  async findAllReflections(
    userId: string,
    query: ReflectionQueryDto,
  ): Promise<ReflectionPaginatedDto> {
    const docs = await this.reflectionModel
      .find({
        createdBy: userId,
        isDeleted: false,
        board: query.boardId,
      })
      .sort({ [query.sortBy]: query.sort })
      .limit(query.pageSize)
      .skip((query.page - 1) * query.pageSize);

    const reflectionsCount = await this.reflectionModel.countDocuments({
      createdBy: userId,
      isDeleted: false,
      board: query.boardId,
    });

    return {
      items: this.toJSONs(docs, ReflectionDto),
      pagination: {
        total: reflectionsCount,
        current: query.page,
        previous: query.page === 1 ? 1 : query.page - 1,
        next:
          docs.length > query.page * query.pageSize
            ? query.page + 1
            : query.page,
      },
    };
  }

  async findOneReflection(userId: string, boardId: string, id: string) {
    const doc = await this.reflectionModel.findOne({
      _id: id,
      createdBy: userId,
      board: boardId,
      isDeleted: false,
    });
    if (!doc) throw new NotFoundException('Reflection not found');

    return this.toJSON(doc, ReflectionDto);
  }

  async updateOneReflection(
    userId: string,
    boardId: string,
    id: string,
    body: UpdateReflectionDto,
  ) {
    const doc = await this.reflectionModel.findOneAndUpdate(
      {
        _id: id,
        createdBy: userId,
        board: boardId,
        isDeleted: false,
      },
      { ...body },
      { new: true },
    );
    if (!doc) throw new NotFoundException('Reflection not found');

    return this.toJSON(doc, ReflectionDto);
  }

  async deleteOneReflection(userId: string, boardId: string, id: string) {
    const doc = await this.reflectionModel.findOneAndUpdate(
      {
        _id: id,
        createdBy: userId,
        board: boardId,
        isDeleted: false,
      },
      { isDeleted: true },
      { new: true },
    );
    if (!doc) throw new NotFoundException('Reflection not found');

    return this.toJSON(doc, ReflectionDto);
  }
}
