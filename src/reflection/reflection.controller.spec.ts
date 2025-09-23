import { Test, TestingModule } from '@nestjs/testing';
import { ReflectionController } from './reflection.controller';
import { ReflectionService } from './reflection.service';

describe('ReflectionController', () => {
  let controller: ReflectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReflectionController],
      providers: [ReflectionService],
    }).compile();

    controller = module.get<ReflectionController>(ReflectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
