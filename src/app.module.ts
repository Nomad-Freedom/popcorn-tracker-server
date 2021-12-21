import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.status.${process.env.STATUS}`,
      validationSchema: configValidationSchema,
    }),
  ],
})
export class AppModule {}
