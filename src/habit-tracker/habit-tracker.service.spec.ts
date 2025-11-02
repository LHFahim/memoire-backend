import { Test, TestingModule } from '@nestjs/testing';
import { HabitTrackerService } from './habit-tracker.service';

describe('HabitTrackerService', () => {
  let service: HabitTrackerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HabitTrackerService],
    }).compile();

    service = module.get<HabitTrackerService>(HabitTrackerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
