export const isActiveLink = (currentPath: string, linkPath: string) => {
  if (currentPath === linkPath) {
    return true;
  }
  return (
    currentPath.startsWith(linkPath) && currentPath.length > linkPath.length + 1
  );
};

export const validateImage = (image: File | null): boolean => {
  if (image) {
    const validImageTypes = ["image/jpeg", "image/png"];
    if (!validImageTypes.includes(image.type)) {
      return false;
    }
    if (image.size > 5 * 1024 * 1024) {
      return false;
    }
  }
  return true;
};
