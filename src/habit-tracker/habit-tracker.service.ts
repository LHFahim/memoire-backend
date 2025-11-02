import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import {
  CreateHabitTrackerDto,
  HabitTrackerDto,
  HabitTrackerPaginatedDto,
  HabitTrackerQueryDto,
  UpdateHabitTrackerDto,
} from './dto/habit-tracker.dto';
import { HabitSessionEntity } from './entities/habit-session.entity';
import { HabitTrackerEntity } from './entities/habit-tracker.entity';

@Injectable()
export class HabitTrackerService extends SerializeService<HabitTrackerEntity> {
  constructor(
    @InjectModel(HabitTrackerEntity)
    private readonly habitTrackerModel: ReturnModelType<
      typeof HabitTrackerEntity
    >,
    @InjectModel(HabitSessionEntity)
    private readonly habitSessionModel: ReturnModelType<
      typeof HabitSessionEntity
    >,
  ) {
    super(HabitTrackerEntity);
  }

  async create(userId: string, body: CreateHabitTrackerDto) {
    const habit = await this.habitTrackerModel.create({
      ...body,
      firstStartedAt: new Date(),
      lastStartedAt: new Date(),
      lastStoppedAt: null,

      lastHabitSession: null,

      isActive: true,
      isDeleted: false,
      createdBy: userId,
    });

    const habitSession = await this.habitSessionModel.create({
      habitId: habit.id,
      startedAt: new Date(habit.firstStartedAt),

      endedAt: null,
      durationInHours: null,

      isActive: true,
      isDeleted: false,
      userId: userId,
    });

    habit.lastHabitSession = habitSession.id;
    await habit.save();

    return this.toJSON(habit, HabitTrackerDto);
  }

  async findAll(
    userId: string,
    query: HabitTrackerQueryDto,
  ): Promise<HabitTrackerPaginatedDto> {
    const docs = await this.habitTrackerModel
      .find({
        createdBy: userId,

        isDeleted: false,
      })
      .sort({ [query.sortBy]: query.sort })
      .limit(query.pageSize)
      .skip((query.page - 1) * query.pageSize);

    const habitCount = await this.habitTrackerModel.countDocuments({
      createdBy: userId,
      isDeleted: false,
    });

    return {
      items: this.toJSONs(docs, HabitTrackerDto),
      pagination: {
        total: habitCount,
        current: query.page,
        previous: query.page === 1 ? 1 : query.page - 1,
        next:
          docs.length > query.page * query.pageSize
            ? query.page + 1
            : query.page,
      },
    };
  }

  async findOne(userId: string, id: string) {
    const habit = await this.habitTrackerModel.findOne({
      _id: id,
      createdBy: userId,
      isDeleted: false,
    });

    if (!habit) {
      throw new Error('Habit not found');
    }

    return this.toJSON(habit, HabitTrackerDto);
  }

  async update(
    userId: string,
    id: string,
    updateHabitTrackerDto: UpdateHabitTrackerDto,
  ) {
    const habit = await this.habitTrackerModel.findOne({
      _id: id,
      createdBy: userId,
      isDeleted: false,
    });

    if (!habit) {
      throw new Error('Habit not found');
    }

    const updateHabit = await this.habitTrackerModel.findByIdAndUpdate(
      id,
      { $set: updateHabitTrackerDto },
      { new: true },
    );

    return this.toJSON(updateHabit, HabitTrackerDto);
  }

  async remove(userId: string, id: string) {
    const habit = await this.habitTrackerModel.findOne({
      _id: id,
      createdBy: userId,
      isDeleted: false,
    });

    if (!habit) {
      throw new Error('Habit not found');
    }

    habit.isDeleted = true;
    await habit.save();

    return this.toJSON(habit, HabitTrackerDto);
  }
}
