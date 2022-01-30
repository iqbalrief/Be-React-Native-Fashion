export class UpdateUserDto {
    id?: number;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    hashedRt?: string;
  }