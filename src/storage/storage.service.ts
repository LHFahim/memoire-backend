import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { optimizeImage } from 'libraries/image/image';
import { ConfigService } from 'src/config/config.service';
import { S3_CLIENT } from './storage.token';

@Injectable()
export class StorageService {
  // private s3: S3;
  private bucket: string;
  private basePrefix: string;
  private domainName: string;

  constructor(
    @Inject(S3_CLIENT) private readonly s3: S3Client,
    private readonly cfg: ConfigService,
  ) {}

  async uploadBuffer(
    userId: string,
    buffer: Buffer,
    contentType: string,
    bucket?: string,
    basePrefix?: string,
  ) {
    const optimizedImage = await optimizeImage(buffer, {
      format: 'png',
      width: 1024,
      height: 1024,
    });

    const key = `${basePrefix}/${userId}_${Date.now()}.png`;

    const result = await this.s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: optimizedImage,
        ContentType: contentType,
      }),
    );

    const url = `https://${bucket}.s3.ap-southeast-2.amazonaws.com/${key}`;

    return { url, result };
  }

  // async getUrl(key: string, bucket?: string, expiresInSeconds = 60) {
  //   const Bucket = bucket;

  //   const command = new GetObjectCommand({ Bucket, Key: key });
  //   const signedUrl = await getSignedUrl(this.s3, command, {
  //     expiresIn: expiresInSeconds,
  //   });
  //   return signedUrl; // usable for 1 hour by default
  // }
}
