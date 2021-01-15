import { UserService } from '../services/userService';
import { User } from '../models/userModel';

import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  Security,
  Response,
  SuccessResponse,
  Example,
  Delete,
  Patch,
  Tags,
} from 'tsoa';

interface UnauthorizedError {
  message: 'asdf failed';
  details: { [name: string]: unknown };
}

@Route('user')
@Tags('Users')
@Security('api_key')
export class UserController extends Controller {
  /**
   * Gets all users right now, yolo style.
   *
   * @summary Get users
   *
   */
  @Get('')
  @Response<UnauthorizedError>(401, 'Unauthorized')
  @Example<User>({
    _id: '52907745-7672-470e-a803-a2f8feb52944',
    first_name: 'joe',
    last_name: 'someone',
  })
  public async getUsers(): Promise<User[]> {
    return new UserService().get();
  }

  /**
   * Creates a new user.
   *
   * @summary Create new user.
   *
   * @param {User} requestBody The model User to create.
   *
   */
  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(@Body() requestBody: User): Promise<any> {
    this.setStatus(201); // set return status 201
    var response = await new UserService().create(requestBody);
    console.log(response);
    return {
      _id: response._id,
      first_name: response.first_name,
      last_name: response.last_name,
    };
  }

  /**
   * Deletes a user by id.
   *
   * @summary Delete user by id.
   *
   * @param {string} userId The id of the User to delete.
   *
   */
  @SuccessResponse('200', 'Deleted')
  @Delete('{userId}')
  public async delete(userId: string): Promise<any> {
    this.setStatus(200); // set return status 201
    var response = await new UserService().delete(userId);
    return {
      message: `Deleted ${response} record(s)`,
    };
  }

  /**
   * Update an existing user.
   *
   * @summary Update an existing user.
   *
   * @param {User} user The user to update.
   *
   */
  @SuccessResponse('200', 'Updated')
  @Patch()
  public async Update(@Body() user: User): Promise<User> {
    console.log(user);
    var response = await new UserService().update(user);
    return response;
  }
}
