import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  lastname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: null })
  updateAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
