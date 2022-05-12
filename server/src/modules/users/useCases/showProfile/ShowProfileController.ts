import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ShowProfileUseCase } from './ShowProfileUseCase';

class ShowProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showProfileUseCase = container.resolve(ShowProfileUseCase);

    const profile = await showProfileUseCase.execute(id);

    return response.status(200).json(profile);
  }
}

export { ShowProfileController };
