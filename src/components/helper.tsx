export const getFilePath = (filePath: string, withApiPrefix = true): string => {
  const filename = filePath.split('/').pop() || 'Untitled';
  return withApiPrefix ? `/api/uploads/${filename}` : filename;
};
