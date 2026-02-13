import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  
  async create(createUserDto: CreateUserDto) {
   
    const newUser = await this.usersRepository.save(createUserDto);
    console.log('✨ บันทึกสำเร็จ! ID ใหม่คือ:', newUser.id);
    return newUser; // ส่งข้อมูลที่ได้กลับไป
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: any) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }
}