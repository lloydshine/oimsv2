export const isActiveLink = (currentPath: string, linkPath: string) => {
  // Check if the linkPath is exactly the current path (e.g., /dashboard)
  if (currentPath === linkPath) {
    return true;
  }
  // For the /dashboard path, ensure that it's not activated for /dashboard/other-pages
  if (linkPath === "/dashboard") {
    return currentPath === linkPath;
  }
  // For other paths like /dashboard/pagename, ensure proper matching
  return (
    currentPath.startsWith(linkPath) && currentPath.length > linkPath.length
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
