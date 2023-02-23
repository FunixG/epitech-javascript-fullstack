import { Controller, Get } from '@nestjs/common';

@Controller()
export class StatusController {
  statusState = true;

  @Get()
  public status(): object {
    return {
      status: this.statusState,
    };
  }
}
