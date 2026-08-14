import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { BranchService } from '../service/branch.service'
import { CreateBranchDto, UpdateBranchDto, CreateBranchHourDto } from '../dto/branch.dto'
import { Branch, BranchHour } from '../model/branch.model'

@Controller('branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Get()
  list(): Promise<Branch[]> {
    return this.branchService.list()
  }

  @Post()
  create(@Body() dto: CreateBranchDto): Promise<Branch> {
    return this.branchService.create(dto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBranchDto): Promise<Branch | null> {
    return this.branchService.update(Number(id), dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.branchService.delete(Number(id))
  }

  @Get(':id/hours')
  hours(@Param('id') id: string): Promise<BranchHour[]> {
    return this.branchService.hours(Number(id))
  }

  @Post(':id/hours')
  addHour(@Param('id') id: string, @Body() dto: CreateBranchHourDto): Promise<BranchHour> {
    return this.branchService.addHour(Number(id), dto)
  }
}
