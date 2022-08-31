import{Request, Response, NextFunction} from 'express';
import  Jwt  from 'jsonwebtoken';
import user from './../models/user';

interface TokenPayload
{
    id:string;
    iat:number;
    ex:number;
}
export default function AuthMiddleware(request: Request, response:Response,next:NextFunction)
{

    const{authorization} = request.headers;

    if(!authorization)
    {
        return response.sendStatus(401);

    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = Jwt.verify(token, 'secret') 

        const {id} = data as TokenPayload;

        request.userId = id 

        return next();
        
    } catch {

        return response.sendStatus(401);
    }
}