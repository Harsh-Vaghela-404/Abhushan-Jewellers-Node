import dateFormat from "dateformat";
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
import multer from "multer";
import crypto from 'crypto';

export const randomImageName = (bytes= 32) => crypto.randomBytes(bytes).toString('hex');

dotenv.config()
export let return_with_data = {
    error: true,
    message:'',
    data:[]
}

export let {...return_without_data} = {
    error: true,
    message:''
}

export const upload = multer({ storage: multer.memoryStorage() });

export const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY || "",
        secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY || "",
    },
    region: process.env.AWS_BUCKET_REGION || "",
});
export function output(status_code: number, status_message: any, data: any = null) {

    let output = {
        status_code: status_code.toString(),
        status_message: status_message,
        datetime: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
        data: data
    };

    return output;
}

export async function upload_image_S3(fileBuffer:Buffer, key:string){
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME || "",
        Key: key,
        Body: fileBuffer,
        ContentType: "image/jpeg", // Modify the content type based on your file type
    };

    await s3.send(new PutObjectCommand(params));
}

export async function get_image_s3(imageName:string){
    const getObjectParams = {
        Bucket: process.env.AWS_BUCKET_NAME || "",
        Key: imageName || ""
    }
    const command = new GetObjectCommand(getObjectParams)
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
    return url;
}

export async function delete_image_s3(imageName:string){
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME || "",
        Key: imageName || ""
    }
    await s3.send(new DeleteObjectCommand(params));
}