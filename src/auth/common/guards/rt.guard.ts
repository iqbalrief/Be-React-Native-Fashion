import { AuthGuard } from "@nestjs/passport";

export class RtGUard extends AuthGuard('jwt-refresh') {
    constructor() {
        super();
    }
}