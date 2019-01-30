import fs from 'fs';
import path from 'path';

/**
 * Find all files recursively in specific folder that matches a RegEx, e.g:
 * findFilesInDirectory('./project', /\.html/) ==> ['./project/a.html','./project/assets/index.html']
 * @param startPath path relative to this file or other file which requires this files
 * @param filter regex used to match file names
 */
const findFilesInDirectory = (startPath: string, filter: RegExp) => {
  let results = [];

  if (!fs.existsSync(startPath)) {
    throw new Error(
      `Could not load '${filter}' files - path at ${startPath} does not exist.`,
    );
  }

  const files = fs.readdirSync(startPath);
  files.forEach(file => {
    const filename = path.join(startPath, file);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      // Recursively search directory
      results = results.concat(findFilesInDirectory(filename, filter));
    } else if (filter.test(filename)) {
      results.push(filename);
    }
  });

  return results;
};

export default findFilesInDirectory;
