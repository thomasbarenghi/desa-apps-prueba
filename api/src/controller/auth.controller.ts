import { Body, Controller, Post } from '@nestjs/common'
import { AuthOrchestrator } from '../service/auth.orchestrator'
import { RegisterDto, LoginDto, RecoverPasswordDto } from '../dto/auth.dto'
import { User } from '../model/user.model'

@Controller('auth')
export class AuthController {
  constructor(private readonly authOrchestrator: AuthOrchestrator) {}

  @Post('register')
  register(@Body() dto: RegisterDto): Promise<User | null> {
    return this.authOrchestrator.register(dto)
  }

  @Post('login')
  login(@Body() dto: LoginDto): Promise<User | null> {
    return this.authOrchestrator.login(dto)
  }

  @Post('recover')
  recover(@Body() dto: RecoverPasswordDto): Promise<void> {
    return this.authOrchestrator.recover(dto.email)
  }
}
