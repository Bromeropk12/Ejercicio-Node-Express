import { Usuario, CreateUsuarioRequest, UpdateUsuarioRequest } from './types/user';
declare class UserService {
    private users;
    private nextId;
    getAllUsers(): Usuario[];
    getUserById(id: number): Usuario | null;
    createUser(userData: CreateUsuarioRequest): Usuario;
    updateUser(id: number, userData: CreateUsuarioRequest): Usuario | null;
    partialUpdateUser(id: number, userData: UpdateUsuarioRequest): Usuario | null;
    deleteUser(id: number): boolean;
    validateUserData(userData: CreateUsuarioRequest | UpdateUsuarioRequest): string[];
    private isValidEmail;
}
export declare const userService: UserService;
export {};
//# sourceMappingURL=userService.d.ts.map