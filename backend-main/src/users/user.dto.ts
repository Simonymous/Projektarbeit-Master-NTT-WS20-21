import { Role } from "src/auth/roles/role.enum";

export class UserDTO {
    constructor(
      public username: string,
      public email: string, 
      public password: string, 
      public roles : Role[],
      ) {}
  }