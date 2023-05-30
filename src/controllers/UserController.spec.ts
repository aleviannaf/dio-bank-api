import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/makeMockResponse.mock";



describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn(),
    }
    const mockRequest = {
        body: {
            name: 'Nath',
            email: 'nath@test.com'
        }
    } as Request
    const mockResponse = makeMockResponse()
    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })

    it('Deve retornar: Bad request! Por causa do email ausente', ()=>{
        const mockRequest = {
            body: {
                name: 'nath'
            }
        } as Request
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
    })

    it('Deve retornar: Bad request! Por causa do nome ausente', ()=>{
        const mockRequest = {
            body: {
                email: 'nath@test.com'
            }
        } as Request
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
    })

    it('Deve retornar a lista de usuários', ()=>{
        userController.getAllUsers(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200);
    })

    it('Deve retornar a mensagem de usuário deletado', ()=>{
        const mockRequest = {
            body: {
                name: 'Nath',
                email: ''
            }
        } as Request

        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado'})
    })
})
