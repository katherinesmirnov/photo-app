// Helper function to extract filename from path
export const getFilename = (filePath: string): string => {
  return filePath.split('/').pop() || 'Untitled';
};
