import { UserRepository } from '../../database/repositories/user';
import { UserService } from './user.service';

describe('UserService', () => {
	let userRepository: UserRepository;
	let service: UserService;

	beforeEach(async () => {
		userRepository = new UserRepository();
		service = new UserService(userRepository);
	});

	it('should be able to find an user', async () => {
		jest.spyOn(userRepository, 'findById').mockResolvedValueOnce({
			id: '1',
		} as any);

		const result = await service.findById('1', { id: '1' } as any);

		expect(result).not.toBeFalsy();
		expect(result).toEqual({ id: '1' });
	});
});
