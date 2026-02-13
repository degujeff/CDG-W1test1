import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 👇 เพิ่มบรรทัดนี้ เพื่ออนุญาตให้หน้าบ้านยิงเข้ามาได้
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  // 👇 เลขตรงนี้ต้องตรงกับที่เจฟเขียนใน Vue (ถ้า Vue ยิงไป 3001 ตรงนี้ก็ต้อง 3001)
  await app.listen(3001);
}
bootstrap();