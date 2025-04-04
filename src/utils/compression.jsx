// Compress string data
export const compressString = async (data) => {
  try {
    const blob = new Blob([data]);
    const compressedBlob = await compressBlob(blob);
    return await blobToBase64(compressedBlob);
  } catch (error) {
    console.error('Error compressing string:', error);
    throw error;
  }
};

// Decompress string data
export const decompressString = async (compressedData) => {
  try {
    const blob = base64ToBlob(compressedData);
    const decompressedBlob = await decompressBlob(blob);
    return await blobToText(decompressedBlob);
  } catch (error) {
    console.error('Error decompressing string:', error);
    throw error;
  }
};

// Compress blob data
export const compressBlob = async (blob) => {
  try {
    const stream = blob.stream();
    const compressedStream = stream.pipeThrough(new CompressionStream('gzip'));
    return await new Response(compressedStream).blob();
  } catch (error) {
    console.error('Error compressing blob:', error);
    throw error;
  }
};

// Decompress blob data
export const decompressBlob = async (blob) => {
  try {
    const stream = blob.stream();
    const decompressedStream = stream.pipeThrough(new DecompressionStream('gzip'));
    return await new Response(decompressedStream).blob();
  } catch (error) {
    console.error('Error decompressing blob:', error);
    throw error;
  }
};

// Compress JSON data
export const compressJSON = async (data) => {
  try {
    const jsonString = JSON.stringify(data);
    return await compressString(jsonString);
  } catch (error) {
    console.error('Error compressing JSON:', error);
    throw error;
  }
};

// Decompress JSON data
export const decompressJSON = async (compressedData) => {
  try {
    const jsonString = await decompressString(compressedData);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error decompressing JSON:', error);
    throw error;
  }
};

// Compress file
export const compressFile = async (file) => {
  try {
    const compressedBlob = await compressBlob(file);
    return new File([compressedBlob], file.name + '.gz', {
      type: 'application/gzip'
    });
  } catch (error) {
    console.error('Error compressing file:', error);
    throw error;
  }
};

// Decompress file
export const decompressFile = async (file) => {
  try {
    const decompressedBlob = await decompressBlob(file);
    return new File([decompressedBlob], file.name.replace('.gz', ''), {
      type: file.type
    });
  } catch (error) {
    console.error('Error decompressing file:', error);
    throw error;
  }
};

// Compress multiple files
export const compressFiles = async (files) => {
  try {
    const compressedFiles = await Promise.all(
      files.map(file => compressFile(file))
    );
    return compressedFiles;
  } catch (error) {
    console.error('Error compressing files:', error);
    throw error;
  }
};

// Decompress multiple files
export const decompressFiles = async (files) => {
  try {
    const decompressedFiles = await Promise.all(
      files.map(file => decompressFile(file))
    );
    return decompressedFiles;
  } catch (error) {
    console.error('Error decompressing files:', error);
    throw error;
  }
};

// Helper function to convert blob to base64
const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// Helper function to convert base64 to blob
const base64ToBlob = (base64) => {
  const binaryString = atob(base64.split(',')[1]);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return new Blob([bytes]);
};

// Helper function to convert blob to text
const blobToText = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(blob);
  });
}; 