import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import {
  CreateHabitSessionDto,
  EndHabitSessionDto,
  UpdateHabitSessionDto,
} from './dto/habit-session.dto';
import {
  CreateHabitTrackerDto,
  HabitSessionDto,
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

    await this.habitSessionModel.updateMany(
      { habitId: id, userId: userId, isDeleted: false },
      { isDeleted: true },
    );

    return this.toJSON(habit, HabitTrackerDto);
  }

  async findAllHabitSessions(userId: string, id: string) {
    const habitSessions = await this.habitSessionModel.find({
      habitId: id,
      userId: userId,
      isDeleted: false,
    });

    return this.toJSONs(habitSessions, HabitSessionDto);
  }

  async findOneHabitSession(userId: string, id: string, sessionId: string) {
    const habitSession = await this.habitSessionModel.findOne({
      _id: sessionId,
      habitId: id,
      userId: userId,
      isActive: true,
      isDeleted: false,
    });

    if (!habitSession) {
      throw new Error('Habit session not found');
    }

    return this.toJSON(habitSession, HabitSessionDto);
  }

  async createHabitSession(
    userId: string,
    id: string,
    body: CreateHabitSessionDto,
  ) {
    const habit = await this.habitTrackerModel.findOne({
      _id: id,
      createdBy: userId,
      isDeleted: false,
    });
    if (!habit) throw new NotFoundException('Habit not found');

    const habitSession = await this.habitSessionModel.create({
      habitId: habit.id,
      userId: userId,
      startedAt: new Date(body.startedAt),
      endedAt: null,
      durationInHours: null,

      isActive: true,
      isDeleted: false,
    });

    habit.lastHabitSession = habitSession.id;
    habit.lastStartedAt = new Date(body.startedAt);
    await habit.save();

    return this.toJSON(habitSession, HabitSessionDto);
  }

  async updateHabitSession(
    userId: string,
    id: string,
    sessionId: string,
    body: UpdateHabitSessionDto,
  ) {
    const habit = await this.habitTrackerModel.findOne({
      _id: id,
      createdBy: userId,
      isDeleted: false,
    });
    if (!habit) throw new NotFoundException('Habit not found');

    const habitSession = await this.habitSessionModel.findOne({
      _id: sessionId,
      habitId: id,
      userId: userId,
      isDeleted: false,
    });
    if (!habitSession) throw new NotFoundException('Habit session not found');

    const updatedHabitSession = await this.habitSessionModel.findByIdAndUpdate(
      sessionId,
      { $set: body },
      { new: true },
    );

    return this.toJSON(updatedHabitSession, HabitSessionDto);
  }

  async deleteHabitSession(userId: string, id: string, sessionId: string) {
    const habit = await this.habitTrackerModel.findOne({
      _id: id,
      createdBy: userId,
      isDeleted: false,
    });
    if (!habit) throw new NotFoundException('Habit not found');

    const habitSession = await this.habitSessionModel.findOne({
      _id: sessionId,
      habitId: id,
      userId: userId,
      isDeleted: false,
    });
    if (!habitSession) throw new NotFoundException('Habit session not found');

    await this.habitSessionModel.findByIdAndUpdate(
      sessionId,
      { isDeleted: true },
      { new: true },
    );

    return true;
  }

  async endHabitSession(
    userId: string,
    id: string,
    sessionId: string,
    body: EndHabitSessionDto,
  ) {
    const habit = await this.habitTrackerModel.findOne({
      _id: id,
      createdBy: userId,
      isDeleted: false,
    });
    if (!habit) throw new NotFoundException('Habit not found');

    const habitSession = await this.habitSessionModel.findOne({
      _id: sessionId,
      habitId: id,
      userId: userId,
      isDeleted: false,
    });
    if (!habitSession) throw new NotFoundException('Habit session not found');

    const durationInHours = this.extractHours(
      new Date(habitSession.startedAt),
      new Date(body.endedAt),
    );

    const doc = await this.habitSessionModel.findByIdAndUpdate(
      sessionId,
      { $set: { endedAt: body.endedAt, isActive: false, durationInHours } },
      // { ...body, isActive: false },
      { new: true },
    );

    habit.lastStoppedAt = new Date(body.endedAt);
    await habit.save();

    return this.toJSON(doc, HabitSessionDto);
  }

  extractHours(startedAt: Date, endedAt: Date): number {
    const diff = endedAt.getTime() - startedAt.getTime();
    const diffInHours = diff / (1000 * 60 * 60);
    return Math.round(diffInHours * 100) / 100;
  }
}
