export interface PathInfoContract {
  isFile: boolean;
  isDirectory: boolean;
  isSymlink: boolean;
  size: number;
  mtime: Date | null;
  atime: Date | null;
  birthtime: Date | null;
  extension: string;
  basename: string;
  dirname: string;
}
