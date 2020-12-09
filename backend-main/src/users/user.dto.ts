

export class UserDTO {
    constructor(
      public _id: string,
      public username: string,
      public email: string, 
      public password: string, 
      public role: string
      ) {}
  }