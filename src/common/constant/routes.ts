import { ControllersEnum } from '../enum/controllers.enum';

export const Routes = {
  [ControllersEnum.AdminAuth]: {
    login: 'login/email',
    registerByEmail: 'register/email',
    refreshJwtToken: 'refresh-token',
    changePassword: 'change-password',
    resetPassword: 'reset-password',
    resetPasswordSendCode: 'reset-password/send',
    verifyEmailPublic: 'verify-email/public',
  },

  [ControllersEnum.Auth]: {
    login: 'login/email',
    registerByEmail: 'register/email',
    refreshJwtToken: 'refresh-token',
  },
  [ControllersEnum.Users]: {
    findAll: '',
    findOne: ':id',
    updateOne: ':id',
    deleteOne: ':id',
  },
  [ControllersEnum.Profile]: {
    me: 'me',
  },

  [ControllersEnum.Todo]: {
    createTodo: '',
    findAllTodos: '',
    findOneTodo: ':boardId/:id',
    updateOneTodo: ':boardId/:id',
    deleteOneTodo: ':boardId/:id',
  },

  [ControllersEnum.Board]: {
    createBoard: '',
    findAllBoards: '',
    findOneBoard: ':id',
    updateOneBoard: ':id',
    deleteOneBoard: ':id',
  },

  [ControllersEnum.Reflection]: {
    createReflection: '',
    findAllReflections: '',
    findOneReflection: ':boardId/:id',
    updateOneReflection: ':boardId/:id',
    deleteOneReflection: ':boardId/:id',
  },
} as const;
