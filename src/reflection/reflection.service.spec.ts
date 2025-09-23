import { Test, TestingModule } from '@nestjs/testing';
import { ReflectionService } from './reflection.service';

describe('ReflectionService', () => {
  let service: ReflectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReflectionService],
    }).compile();

    service = module.get<ReflectionService>(ReflectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
