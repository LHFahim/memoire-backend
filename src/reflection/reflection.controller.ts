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
  CreateReflectionDto,
  ReflectionQueryDto,
  UpdateReflectionDto,
} from './dto/reflection.dto';
import { ReflectionService } from './reflection.service';

@ApiTags('Reflection')
@Serialize()
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: ControllersEnum.Reflection, version: APIVersions.V1 })
export class ReflectionController {
  constructor(private readonly reflectionService: ReflectionService) {}

  @Post(Routes[ControllersEnum.Reflection].createReflection)
  createReflection(
    @UserId() userId: string,
    @Body() body: CreateReflectionDto,
  ) {
    return this.reflectionService.createReflection(userId, body);
  }

  @Get(Routes[ControllersEnum.Reflection].findAllReflections)
  findAllReflections(
    @UserId() userId: string,
    @Query() query: ReflectionQueryDto,
  ) {
    return this.reflectionService.findAllReflections(userId, query);
  }

  @Get(Routes[ControllersEnum.Reflection].findOneReflection)
  findOneReflection(
    @UserId() userId: string,
    @ResourceId('boardId') boardId: string,
    @ResourceId('id') id: string,
  ) {
    return this.reflectionService.findOneReflection(userId, boardId, id);
  }

  @Patch(Routes[ControllersEnum.Reflection].updateOneReflection)
  updateOneReflection(
    @UserId() userId: string,
    @ResourceId('boardId') boardId: string,
    @ResourceId('id') id: string,
    @Body() updateReflectionDto: UpdateReflectionDto,
  ) {
    return this.reflectionService.updateOneReflection(
      userId,
      boardId,
      id,
      updateReflectionDto,
    );
  }

  @Delete(Routes[ControllersEnum.Reflection].deleteOneReflection)
  deleteOneReflection(
    @UserId() userId: string,
    @ResourceId('boardId') boardId: string,
    @ResourceId('id') id: string,
  ) {
    return this.reflectionService.deleteOneReflection(userId, boardId, id);
  }
}
