import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 👈 1. ต้อง import อันนี้
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity'; // 👈 2. ต้อง import อันนี้

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 👈 3. บรรทัดนี้สำคัญที่สุด! ขาดไม่ได้!
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }