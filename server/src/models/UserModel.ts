import bcrypt from 'bcryptjs';
import mongoose, { Schema, SchemaTypes } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  gender?: string;
  occupation?: string;
  imageLink: string;
  verified: boolean;
  password: string;
  role: string;
  viewSensitive: boolean;
  viewPolitical: boolean;
  createdAt?: string;
  updatedAt?: string;
  releventCategories: string[];

  isValidPassword: (password: string) => Promise<boolean>;
  beforeCreate: (user: any) => Promise<void>;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: 'string', trim: true, minLength: 6, maxlength: 100, required: true },
    email: {
      type: 'string',
      trim: true,
      unique: true,
      required: true,
    },
    gender: { type: 'string' },
    occupation: { type: 'string' },
    imageLink: { type: 'string', required: false, trim: true },
    verified: { type: 'boolean', default: false },
    password: { type: 'string', trim: true, minLength: 6, maxLength: 100, required: false },
    role: { type: 'string', enum: ['superadmin', 'admin', 'user'] },
    viewSensitive: { type: 'boolean', default: false },
    viewPolitical: { type: 'boolean', default: false },
    releventCategories: [SchemaTypes.ObjectId],
  },
  {
    timestamps: true,
  },
);

UserSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    // ret.id = ret._id;
    delete ret.password;
    //   delete ret._id;
    delete ret.__v;
  },
});

UserSchema.pre('save', function (next) {
  if (!this.password) {
    return next();
  }

  if (!(this.isModified('password') || this.isNew)) {
    return next();
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

UserSchema.methods.isValidPassword = async function (password: string) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error: any) {
    throw new Error(error);
  }
};

export default mongoose.model<IUser>('User', UserSchema);
