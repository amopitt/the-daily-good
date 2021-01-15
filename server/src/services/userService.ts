import { User, UserMongoModel } from '../models/userModel';

export class UserService {
  /** Method gets all users currently. */
  public get(): Promise<User[]> {
    return UserMongoModel.find()
      .limit(50)
      .then((users: any) => {
        return users;
      })
      .catch((err: any) => console.log(err));
  }

  /** Method creates a new user. */
  public async create(requestBody: User): Promise<User> {
    console.log('i got this', requestBody);
    const user = new UserMongoModel({
      first_name: requestBody.first_name,
      last_name: requestBody.last_name,
    });
    await user.save();
    return user as any;
  }

  public async delete(id: string): Promise<number> {
    console.log(id);
    const response = await UserMongoModel.deleteOne({ _id: id });
    return response.deletedCount;
  }

  public async update(requestBody: any): Promise<any> {
    const user = new UserMongoModel({
      _id: requestBody._id,
      first_name: requestBody.first_name,
      last_name: requestBody.last_name,
    });
    const response = await UserMongoModel.updateOne({ _id: requestBody._id }, user);
    console.log(response);
    return response.ok > 0;
  }
}
