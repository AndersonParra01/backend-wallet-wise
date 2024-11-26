import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';

@Module({})
export class DatabaseModule {
  static registerSchema(schemaName: string, schemaClass: any): DynamicModule {
    const schema = SchemaFactory.createForClass(schemaClass);

    return {
      module: DatabaseModule,
      imports: [MongooseModule.forFeature([{ name: schemaName, schema }])],
      exports: [MongooseModule],
    };
  }
}
