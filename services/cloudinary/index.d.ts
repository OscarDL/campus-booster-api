import multer from 'multer';
/**
 * ### Set up Multer instance
 * @param folderName The folder name where upload your file
 * @returns {Multer} Your Multer instance ready.
 */
declare function M(folderName: string): multer.Multer;

export default M;