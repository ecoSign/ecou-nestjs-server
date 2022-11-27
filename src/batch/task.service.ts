import { Injectable, Logger } from '@nestjs/common';
import {
  Cron,
  CronExpression,
  Interval,
  SchedulerRegistry,
  Timeout,
} from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {
    this.addCronJob();
  }

  addCronJob() {
    const name = 'cronSample';

    // 초(0-59), 분(0-59), 시간(0-23), 날(1-31), 월(0-12), 요일(0-7)
    const job = new CronJob(`* * * * * *`, () => {
      this.logger.warn(`run! ${name}`);
    });

    this.schedulerRegistry.addCronJob(name, job);

    this.logger.warn(`job ${name} added!`);
  }

  /*
  @Cron('* * * * * *', { name: 'cronTask' })
  // @Cron(new Date(Date.now() + 3 * 1000))
  // @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_1AM)
  handleCron() {
    this.logger.log('Task Called');
  }
  @Interval('intervalTask', 3000)
  handleInterval() {
    this.logger.log('Task Called by Interval');
  }
  @Timeout('timeoutTask', 5000)
  handleTimeout() {
    this.logger.log('Task Called by Timeout');
  }
  */
}
