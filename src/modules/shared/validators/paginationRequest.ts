import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min, IsInt } from 'class-validator';

import { IPaginationRequest } from '../interfaces/pagination';

export class IPaginationRequestQuery implements IPaginationRequest {
	@IsNotEmpty()
	@IsInt()
	@Min(0)
	@ApiProperty({
		required: true,
		type: Number,
		minimum: 0,
	})
	public page: number;
}
