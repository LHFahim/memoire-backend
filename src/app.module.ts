import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AdminModule } from './admin/admin.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { ProfileModule } from './profile/profile.module';
import { ReflectionModule } from './reflection/reflection.module';
import { StorageModule } from './storage/storage.module';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.MONGODB_URL,
      }),
      inject: [ConfigService],
    }),

    ConfigModule,
    UserModule,
    AuthModule,

    AdminModule,

    ProfileModule,

    TodoModule,

    BoardModule,

    ReflectionModule,

    StorageModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
