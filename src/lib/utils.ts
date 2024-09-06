export const isActiveLink = (currentPath: string, linkPath: string) => {
  if (currentPath === linkPath) {
    return true;
  }
  return (
    currentPath.startsWith(linkPath) && currentPath.length > linkPath.length + 1
  );
};
