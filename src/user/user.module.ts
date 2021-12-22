import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import {  Address } from 'src/user/entities/address.entity'
import {  Compromisse } from 'src/user/entities/compromisse.entity'
import {  UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { Friendship } from './entities/friendship.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Address, Compromisse, Friendship]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UsersModule {}