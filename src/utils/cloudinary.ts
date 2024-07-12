/**
 * Generate an optimized Cloudinary URL with auto format and quality.
 * @param url - The original Cloudinary URL.
 * @returns The optimized Cloudinary URL.
 */
export const getOptimizedCloudinaryUrl = (url: string): string => {
  const urlParts = url.split("/");

  // Find the 'upload' part and insert transformations after it
  const uploadIndex = urlParts.indexOf("upload");
  if (uploadIndex === -1) {
    throw new Error('Invalid Cloudinary URL: missing "upload" segment');
  }

  // Insert the transformations after 'upload'
  const transformations = "f_auto,q_auto";
  urlParts.splice(uploadIndex + 1, 0, transformations);

  return urlParts.join("/");
};
