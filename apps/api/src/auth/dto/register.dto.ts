import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsArray,
  ArrayNotEmpty,
  IsIn,
} from 'class-validator';

export enum Course {
  Python = 'Python',
  AI = 'AI',
  WebDev = 'WebDev',
  Graphics = 'Graphics',
}

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name!: string;

  @IsEmail()
  @MaxLength(255)
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, {
    message:
      'Password must include uppercase, lowercase, number, and special character.',
  })
  password!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  confirmPassword!: string;

  @IsArray()
  @ArrayNotEmpty({ message: 'Please select at least one course.' })
  @IsIn(Object.values(Course), { each: true, message: 'Invalid course selected.' })
  selectedCourses!: Course[];
}
