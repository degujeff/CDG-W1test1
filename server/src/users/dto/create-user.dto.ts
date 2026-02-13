import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({ message: 'ชื่อห้ามว่างนะ' })
    name: string;

    @IsEmail({}, { message: 'รูปแบบอีเมลไม่ถูกต้อง' })
    @IsNotEmpty({ message: 'ลืมใส่อีเมลหรือเปล่า' })
    email: string;
}