import { Request, Response } from 'express';
export declare class UserController {
    getAllUsers(req: Request, res: Response): void;
    getUserById(req: Request, res: Response): void;
    createUser(req: Request, res: Response): void;
    updateUser(req: Request, res: Response): void;
    partialUpdateUser(req: Request, res: Response): void;
    deleteUser(req: Request, res: Response): void;
    private sendErrorResponse;
}
export declare const userController: UserController;
//# sourceMappingURL=userController.d.ts.map