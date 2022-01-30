import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetCurrentUser = createParamDecorator(
     (data: string | undefined, Context: ExecutionContext) => {
         const request = Context.switchToHttp().getRequest();
         if(!data) return request.user
         return request.user['data']
     }
)