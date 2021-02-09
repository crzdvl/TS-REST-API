import * as bcrypt from 'bcrypt';

import TokenModel, { ITokenModel } from './model';
import UserModel, { IUserModel } from '../User/model';

const AuthService: {
  createUser(_id: string, id_type: string, password: string): Promise <IUserModel>,
  getUser(id: string, password: string): Promise <IUserModel>,
  getIdType(id: string): string,
  getHashedPassword(password: string): Promise<string>,
  findToken(token: string): Promise <ITokenModel>,
  createToken(user_id: string, token: string): Promise <ITokenModel>,
  deleteUsersToken(token: string): Promise <ITokenModel>,
  deleteAllUsersTokens(user_id: string): Promise <ITokenModel>
} = {
  async createUser(_id: string, id_type: string, password: string): Promise <IUserModel> {
    try {
      const query: IUserModel = await UserModel.findOne({ _id });

      if (query) {
        throw new Error('This id already exists');
      }

      return await UserModel.create({ _id, id_type, password });
    } catch (error) {
      throw new Error(error);
    }
  },
  async getUser(id: string, password: string): Promise <IUserModel> {
    try {
      const user: IUserModel = await UserModel.findOne({ _id: id });

      if (user === null) throw new Error('User didn\'t found');

      const match: boolean = await bcrypt.compare(password, user.password);

      if (!match) throw new Error('Invalid password or email');

      return user;
    } catch (error) {
      throw new Error(error);
    }
  },
  getIdType(id: string): string {
    let idType = '';
    const phoneRegExp = /^(\+\d{3})?\d{9}$/;
    const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (phoneRegExp.test(id.replace(/\s+/g, ''))) {
      idType = 'phone';
    } else if (emailRegExp.test(id)) {
      idType = 'email';
    }

    return idType;
  },
  async getHashedPassword(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(10);

    const hashedPassword: string = await bcrypt.hash(password, salt);

    return hashedPassword;
  },
  async findToken(token: string): Promise <ITokenModel> {
    try {
      return await TokenModel.findOne({ token });
    } catch (error) {
      throw new Error(error);
    }
  },
  async createToken(user_id: string, token: string): Promise <ITokenModel> {
    try {
      return await TokenModel.create({ user_id, token });
    } catch (error) {
      throw new Error(error);
    }
  },
  async deleteUsersToken(token: string): Promise <ITokenModel> {
    try {
      return await TokenModel.deleteOne({ token });
    } catch (error) {
      throw new Error(error);
    }
  },
  async deleteAllUsersTokens(user_id: string): Promise <ITokenModel> {
    try {
      return await TokenModel.deleteMany({ user_id });
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default AuthService;
