import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class FindUsersRequestModel {
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @Transform(({ value }) => (value ? +value : value))
  @ApiProperty({ format: 'int', required: false })
  page?: number;

  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @Transform(({ value }) => (value ? +value : value))
  @ApiProperty({ format: 'int', required: false })
  resultsPerPage?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  search?: string;
}
