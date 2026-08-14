import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { UserService } from '../service/user.service'
import { UpdateProfileDto, CreateAdminDto } from '../dto/user.dto'
import { User } from '../model/user.model'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findById(Number(id))
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProfileDto): Promise<User | null> {
    return this.userService.update(Number(id), dto)
  }
}

@Controller('admin/users')
export class AdminUserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  list(): Promise<User[]> {
    return this.userService.listByRole('admin')
  }

  @Post()
  create(@Body() dto: CreateAdminDto): Promise<User> {
    return this.userService.create({
      email: dto.email,
      passwordHash: dto.password,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone: dto.phone,
      role: 'admin',
      active: true,
    })
  }
}
