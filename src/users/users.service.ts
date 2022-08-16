import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { Model } from 'mongoose';
import {
  VaccineTracker,
  VaccineTrackerDocument,
} from '../vaccine_tracker/schemas/vaccine_tracker.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(VaccineTracker.name)
    private vaccineTrackerModel: Model<VaccineTrackerDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // async findCountry(): Promise<User[]> {
  //   return this.vaccineTrackerModel.find().exec();
  // }
}
