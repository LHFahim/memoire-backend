import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Serialize } from 'libraries/serializer/serializer.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Routes } from 'src/common/constant/routes';
import { ResourceId } from 'src/common/decorator/params.decorator';
import { UserId } from 'src/common/decorator/user.decorator';
import { APIVersions } from 'src/common/enum/api-versions.enum';
import { ControllersEnum } from 'src/common/enum/controllers.enum';
import {
  CreateHabitTrackerDto,
  HabitTrackerQueryDto,
  UpdateHabitTrackerDto,
} from './dto/habit-tracker.dto';
import { HabitTrackerService } from './habit-tracker.service';

@ApiTags('Habits')
@Serialize()
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: ControllersEnum.Habit, version: APIVersions.V1 })
export class HabitTrackerController {
  constructor(private readonly habitTrackerService: HabitTrackerService) {}

  @Post(Routes[ControllersEnum.Habit].createHabit)
  create(@UserId() userId: string, @Body() body: CreateHabitTrackerDto) {
    return this.habitTrackerService.create(userId, body);
  }

  @Get(Routes[ControllersEnum.Habit].findAllHabits)
  findAll(@UserId() userId: string, @Query() query: HabitTrackerQueryDto) {
    return this.habitTrackerService.findAll(userId, query);
  }

  @Get(Routes[ControllersEnum.Habit].findOneHabit)
  findOne(@UserId() userId: string, @ResourceId() id: string) {
    return this.habitTrackerService.findOne(userId, id);
  }

  @Patch(Routes[ControllersEnum.Habit].updateOneHabit)
  update(
    @UserId() userId: string,
    @ResourceId() id: string,
    @Body() updateHabitTrackerDto: UpdateHabitTrackerDto,
  ) {
    return this.habitTrackerService.update(userId, id, updateHabitTrackerDto);
  }

  @Delete(Routes[ControllersEnum.Habit].deleteOneHabit)
  remove(@UserId() userId: string, @ResourceId() id: string) {
    return this.habitTrackerService.remove(userId, id);
  }
}
