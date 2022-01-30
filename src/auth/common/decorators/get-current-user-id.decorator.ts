import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetCurrentUserId = createParamDecorator(
     (sub: undefined, Context: ExecutionContext): any => {
         const request = Context.switchToHttp().getRequest();
        return request.user['sub']
     }
)