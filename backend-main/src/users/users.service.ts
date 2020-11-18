import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'simon',
        password: 'pw',
      },
      {
        userId: 2,
        username: 'pascal',
        password: 'pw',
      },
      {
        userId: 3,
        username: 'philipp',
        password: 'pw',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}