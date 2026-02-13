import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'jeff',             // ✅ ตรงกับ docker-compose
      password: '!!!!!!!!!####$%%$$@$#@#!@$@#!@$@#$@',     // ✅ ตรงเป๊ะตามที่คุณตั้ง
      database: 'mydb',             // ✅ ชื่อ Database ของคุณ
      autoLoadEntities: true,       // ช่วยโหลดตารางให้อัตโนมัติ
      synchronize: true,            // สร้างตารางให้เอง (ใช้ตอน Dev)
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }