import multer from "multer";
import aws from 'aws-sdk';
/**
 * Upload an image file into AWS private Bucket
 * @param directory The name of your AWS directory to store the document
 * @returns {multer.Multer} a multer object initialize
 */
export declare function uploadImage(directory: string): multer.Multer;
/**
 * Upload a document file into AWS private Bucket
 * @param directory The name of your AWS directory to store the document
 * @returns {multer.Multer} a multer object initialize
 */
export declare function uploadDocument(directory: string): multer.Multer;
/**
 * Download a file into AWS private Bucket
 * @param fileKey The key of your file :
 * https://your.aws.instance.com/ `YOUR FILE KEY`
 * @returns {Promise} a promise of s3 download result
 */
export declare function download(fileKey: string): Promise<aws.S3.GetObjectOutput>;
/**
 * Delete a file from AWS private Bucket
 * @param fileKey The key of your file :
 * https://your.aws.instance.com/ `YOUR FILE KEY`
 * @returns {Promise} a promise of s3 delete result
 */
export declare function remove(fileKey: string): Promise<aws.S3.DeleteObjectOutput>;