import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './Auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { MailerModule} from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
    throttlers: [{
      ttl : 60000,
      limit: 50
    }]
  }) ,
  forwardRef(()=> UserModule), 
  forwardRef(()=> AuthModule),
  MailerModule.forRoot({
    transport: {    host: 'smtp.ethereal.email',
      auth: {
          user: 'bobbie.oberbrunner@ethereal.email',
          pass: 'XwtfQPCQS6yb5sqfgP'
      },
      tls: {
        rejectUnauthorized: false, // Isso desabilita a verificação de certificados
      },
    },
    defaults: {
      from: '"nest-modules" <bobbie.oberbrunner@ethereal.email>',
    },
    template: {
      dir: __dirname + '/../Templates',
      adapter: new PugAdapter(),
      options: {
        strict: true,
      },
    },
  })
],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppModule]
})
export class AppModule {}
