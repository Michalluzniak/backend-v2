import {
  IsDateString,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRequestModel {
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  @ApiProperty({ minLength: 8, maxLength: 255, required: false })
  password: string;

  @IsString()
  @MaxLength(80)
  @IsOptional()
  @ApiProperty({ maxLength: 80, required: false })
  firstName?: string;

  @IsString()
  @MaxLength(80)
  @IsOptional()
  @ApiProperty({ maxLength: 80, required: false })
  lastName?: string;

  @IsString()
  @MaxLength(500)
  @IsOptional()
  @ApiProperty({ maxLength: 500, required: false })
  biography?: string;

  @IsUrl({})
  @IsOptional()
  @ApiProperty({ format: 'url', required: false, example: 'https://zaven.co/' })
  website?: string;

  @IsDateString({ strictMode: true, format: 'YYYY-MM-DD' })
  @IsOptional()
  @ApiProperty({ format: 'date', required: false })
  birthday?: string;
}
