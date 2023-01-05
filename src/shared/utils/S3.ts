import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
@Injectable()
export class S3Service {
  private s3: S3Client;
  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadPicS3(image: Buffer, token: string, mimetype: string) {
    const uploadParams = {
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Key: `${token}`,
      Body: image,
      ContentType: mimetype,
    } as PutObjectCommandInput;

    await this.s3.send(new PutObjectCommand(uploadParams));
    return `https://${process.env.AWS_PUBLIC_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${token}`;
  }

  async deletePicS3(key: string) {
    const deleteParams = {
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Key: key,
    };

    return this.s3.send(new DeleteObjectCommand(deleteParams));
  }
}
