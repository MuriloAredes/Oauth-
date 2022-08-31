import{Request, Response} from 'express';
import { DataSource } from 'typeorm';
import { AppDataSource } from './../../database/connect';
import User from './../models/user';


 class UserController{

  async  store(request: Request, response: Response)
    {
        const repository = AppDataSource.getRepository(User);
        const{email, password} = request.body;
        
        const userExist = await repository.findOne({where: {email}});

        if(userExist != null)
        {
            return response.sendStatus(409);
        }

        const user = repository.create({email, password})
        await repository.save(user);

        return response.json(user)
    }
}

export default new UserController()