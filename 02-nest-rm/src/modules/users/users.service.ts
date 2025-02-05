import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { hashPassword } from '@/helpers/utils';
import aqp from 'api-query-params';
import { RegisterDTO } from '@/auth/dto/register-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly mailerService: MailerService,
  ) {}
  isExist = async (email: string): Promise<boolean> => {
    const user = await this.userModel.exists({ email });
    return !!user;
  };

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, phone, address, image } = createUserDto;
    const hashPass = hashPassword(password);
    // tao doi tuong user
    if (await this.isExist(email)) {
      throw new BadRequestException('This email is exist!!!');
    }
    const user = await this.userModel.create({
      name,
      email,
      password: hashPass,
      phone,
      address,
      image,
    });

    return {
      user,
    };
  }

  async findAll(query: string, current: number, pageSize: number) {
    if (!current) {
      current = 1;
    }
    if (!pageSize) {
      pageSize = 5;
    }

    const { filter, sort } = aqp(query);
    // xoá current va pageSize trên filter
    if (filter.current) {
      delete filter.current;
    }

    if (filter.pageSize) {
      delete filter.pageSize;
    }

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const offset = (current - 1) * pageSize;

    const users = await this.userModel
      .find(filter)
      .skip(offset)
      .limit(pageSize)
      .sort(sort as any)
      .exec();
    return {
      users,
      totalPages,
    };
  }

  async findById(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('Id is required');
      }
      const response = await this.userModel.findById(id);
      if (!response) {
        throw new BadRequestException('User not found');
      }
      return response;
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestException('Id is invalid');
      }
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      if (!email) {
        throw new BadRequestException('Email is required');
      }
      const response = await this.userModel
        .findOne({ email })
        .select('+password');
      if (!response) {
        throw new BadRequestException('User not found');
      }
      return response;
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestException('Email is invalid');
      }
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findById(id);
      if (!user) {
        throw new BadRequestException('User not found');
      }
      // Toán tử $set dùng để cập nhật cái phương thay đổi
      const response = await this.userModel.updateOne(
        { _id: id },
        { $set: updateUserDto },
      );
      if (!response) {
        throw new BadRequestException('User not found');
      }
      if (response.modifiedCount === 0) {
        throw new BadRequestException('User not found');
      }

      return {
        msg: 'Update user successfully',
      };
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestException('Id is invalid');
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const user = await this.findById(id);
      if (!user) {
        throw new BadRequestException('User not found');
      }
      const response = await this.userModel.deleteOne({ _id: id });
      if (!response) {
        throw new BadRequestException('User not found');
      }

      return {
        msg: 'Delete user successfully',
      };
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestException('Id is invalid');
      }
      throw error;
    }
  }

  async signUp(registerDTO: RegisterDTO) {
    const { name, email, password } = registerDTO;
    const hashPass = hashPassword(password);

    const codeId = uuidv4();

    // tao doi tuong user
    if (await this.isExist(email)) {
      throw new BadRequestException('This email is exist!!!');
    }

    const user = await this.userModel.create({
      name,
      email,
      password: hashPass,
      isActive: 'false',
      codeId: codeId,
      // codeExpired: dayjs().add(5, 'minute'),
      codeExpired: dayjs().add(30, 'seconds'),
    });

    // gui mail
    this.mailerService.sendMail({
      to: user.email,
      from: 'noreply@nestjs.com',
      subject: 'Testing Nest MailerModule ✔',
      template: 'register',
      text: 'Welcome',
      context: {
        name: user?.name || user.email,
        activationCode: codeId,
      },
    });

    // tra ve
    return {
      user,
    };
  }
}
