import {
  Controller,
  Post,
  Inject,
  UseInterceptors,
  ClassSerializerInterceptor,
  Body,
  Headers,
  HttpException,
  UseGuards,
  Param,
  Get,
  Query,
  Req,
  LoggerService,
} from '@nestjs/common';
import { StatusJobDto } from './dto/status-event.dto';
import { PosthogBatchEventDto } from './dto/posthog-batch-event.dto';
import { EventDto } from './dto/event.dto';
import { WorkflowTick } from '../workflows/interfaces/workflow-tick.interface';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JobTypes } from './interfaces/event.interface';
import { ApiKeyAuthGuard } from '../auth/guards/apikey-auth.guard';
import { Account } from '../accounts/entities/accounts.entity';
import { Request } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller('events')
export class EventsController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    @Inject(EventsService)
    private readonly eventsService: EventsService
  ) {}

  @Post('job-status/email')
  @UseInterceptors(ClassSerializerInterceptor)
  async getJobEmailStatus(@Body() body: StatusJobDto): Promise<string> {
    this.logger.debug(
      ``,
      `events.controller.ts:EventsController.getJobEmailStatus()`
    );
    return this.eventsService.getJobStatus(body, JobTypes.email);
  }

  @Post('job-status/slack')
  @UseInterceptors(ClassSerializerInterceptor)
  async getJobSlackStatus(@Body() body: StatusJobDto): Promise<string> {
    this.logger.debug(
      ``,
      `events.controller.ts:EventsController.getJobSlackStatus()`
    );
    return this.eventsService.getJobStatus(body, JobTypes.slack);
  }

  @Post('job-status/webhook')
  @UseInterceptors(ClassSerializerInterceptor)
  async getJobWebhookStatus(@Body() body: StatusJobDto): Promise<string> {
    this.logger.debug(
      ``,
      `events.controller.ts:EventsController.getWebhookStatus()`
    );
    return this.eventsService.getJobStatus(body, JobTypes.webhooks);
  }

  @Post('/posthog/')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(ApiKeyAuthGuard)
  async getPostHogPayload(
    @Headers('Authorization') apiKey: string,
    @Body() body: PosthogBatchEventDto
  ): Promise<WorkflowTick[] | HttpException> {
    this.logger.debug(
      `${JSON.stringify(body)}`,
      `events.controller.ts:EventsController.getPosthogPayload()`
    );
    return this.eventsService.getPostHogPayload(apiKey, body);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(ApiKeyAuthGuard)
  async enginePayload(
    @Headers('Authorization') apiKey: string,
    @Body() body: EventDto
  ): Promise<WorkflowTick[] | HttpException> {
    this.logger.debug(
      ``,
      `events.controller.ts:EventsController.enginePayload()`
    );
    return this.eventsService.enginePayload(apiKey, body);
  }

  @Get('/possible-attributes/:resourceId?')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getAttributes(
    @Req() { user }: Request,
    @Param('resourceId') resourceId = '',
    @Query('provider') provider
  ) {
    this.logger.debug(
      ``,
      `events.controller.ts:EventsController.getAttributes()`
    );
    return this.eventsService.getAttributes(
      resourceId,
      (<Account>user).id,
      provider || undefined
    );
  }

  @Get('/attributes/:resourceId?')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getOrUpdateAttributes(@Param('resourceId') resourceId = '') {
    this.logger.debug(
      ``,
      `events.controller.ts:EventsController.getOrUpdateAttributes()`
    );
    return this.eventsService.getOrUpdateAttributes(resourceId);
  }

  @Get('/possible-types')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getPossibleTypes() {
    this.logger.debug(
      ``,
      `events.controller.ts:EventsController.getPossibleTypes()`
    );
    return this.eventsService.getPossibleTypes();
  }

  @Get('/possible-comparison/:type')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getPossibleComparison(@Param('type') type: string) {
    this.logger.debug(
      ``,
      `events.controller.ts:EventsController.getPossibleComparison()`
    );
    return this.eventsService.getPossibleComparisonTypes(type);
  }

  @Get('/possible-values/:key')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getPossibleValues(
    @Param('key') key: string,
    @Query('search') search: string
  ) {
    this.logger.debug(
      ``,
      `events.controller.ts:EventsController.getPossibleValues()`
    );
    return this.eventsService.getPossibleValues(key, search);
  }

  @Get('/possible-posthog-types')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getPossiblePothogTypes(
    @Query('search') search: string,
    @Req() { user }: Request
  ) {
    this.logger.debug(
      ``,
      `events.controller.ts:EventsController.getPossiblePothogTypes()`
    );
    return this.eventsService.getPossiblePosthogTypes(
      search,
      (<Account>user).id
    );
  }

  @Get('/posthog-events')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getPosthogEvents(
    @Req() { user }: Request,
    @Query('take') take?: string,
    @Query('skip') skip?: string,
    @Query('search') search?: string
  ) {
    return this.eventsService.getPosthogEvents(
      <Account>user,
      take && +take,
      skip && +skip,
      search
    );
  }
}
