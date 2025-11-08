import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/requests/register-user.dto';
import { LoginDto } from './dto/requests/login.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto) {
    const { username, password } = dto;

    // Kiểm tra trùng username
    const existing = await this.userRepo.findOne({ where: { username } });
    if (existing) {
      throw new UnauthorizedException('Username already exists');
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ username, password: hashed });
    await this.userRepo.save(user);

    return { message: 'User registered successfully', userId: user.id };
  }

  async login(dto: LoginDto) {
    const { username, password } = dto;
    const user = await this.userRepo.findOne({ where: { username } });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { username: user.username, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  async logout() {
    // Logout bằng cách client xoá token (server không giữ state)
    return { message: 'Logout successful (client should clear token)' };
  }
}

