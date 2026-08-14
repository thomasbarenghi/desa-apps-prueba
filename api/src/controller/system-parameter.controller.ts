import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { SystemParameterService } from '../service/system-parameter.service'
import { CreateSystemParameterDto, UpdateSystemParameterDto } from '../dto/system-parameter.dto'
import { SystemParameter } from '../model/system-parameter.model'

@Controller('system-parameters')
export class SystemParameterController {
  constructor(private readonly systemParameterService: SystemParameterService) {}

  @Get()
  list(): Promise<SystemParameter[]> {
    return this.systemParameterService.list()
  }

  @Post()
  create(@Body() dto: CreateSystemParameterDto): Promise<SystemParameter> {
    return this.systemParameterService.create(dto)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateSystemParameterDto,
  ): Promise<SystemParameter | null> {
    return this.systemParameterService.update(Number(id), dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.systemParameterService.delete(Number(id))
  }
}
