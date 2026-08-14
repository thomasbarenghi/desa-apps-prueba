import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { GeneralStateService } from '../service/general-state.service'
import { CreateGeneralStateDto, UpdateGeneralStateDto } from '../dto/general-state.dto'
import { GeneralState } from '../model/general-state.model'

@Controller('general-states')
export class GeneralStateController {
  constructor(private readonly generalStateService: GeneralStateService) {}

  @Get()
  list(): Promise<GeneralState[]> {
    return this.generalStateService.list()
  }

  @Post()
  create(@Body() dto: CreateGeneralStateDto): Promise<GeneralState> {
    return this.generalStateService.create(dto)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateGeneralStateDto,
  ): Promise<GeneralState | null> {
    return this.generalStateService.update(Number(id), dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.generalStateService.delete(Number(id))
  }
}
