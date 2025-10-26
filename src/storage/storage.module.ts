import { S3Client } from '@aws-sdk/client-s3';
import { Module } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { StorageService } from './storage.service';
import { S3_CLIENT } from './storage.token';

@Module({
  controllers: [],
  providers: [
    {
      provide: S3_CLIENT,
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const { region, accessKey, secretKey } = cfg.amazonS3;
        return new S3Client({
          region,
          credentials:
            accessKey && secretKey
              ? {
                  accessKeyId: accessKey,
                  secretAccessKey: secretKey,
                }
              : undefined,
        });
      },
    },
    StorageService,
  ],
  exports: [StorageService, S3_CLIENT],
})
export class StorageModule {}
