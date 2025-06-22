import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtRole } from "./jwt-roles";

@Injectable()
export class JwstRolesGuard{
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.getAllAndOverride<JwtRole[]>('roles', [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredRoles) {
        return true;
      }
      const { user } = context.switchToHttp().getRequest();
      return requiredRoles.some((role) => user?.roles?.includes(role));
    }
}