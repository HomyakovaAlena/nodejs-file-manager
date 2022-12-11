const HELP_MESSAGE = `
Welcome to FileManager!

List of supported operations and their syntax:

(1) Basic operations with files:
up                                      - go upper from current directory
cd path_to_directory                    - go to dedicated folder from current directory (path_to_directory can be relative or absolute)
ls                                      - print in console list of all files and folders in current directory
cat path_to_file                        - read file and print it's content in console
add new_file_name                       - create empty file in current working directory
rn path_to_file new_filename            - rename file
cp path_to_file path_to_new_directory   - copy file
mv path_to_file path_to_new_directory   - move file
rm path_to_file                         - delete file

(2) Operating system info:
os --EOL                                - get EOL (default system End-Of-Line)
os --cpus                               - get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)
os --homedir                            - get home directory
os --username                           - get current system user name
os --architecture                       - get CPU architecture for which Node.js binary has compiled

(3) Hash calculation:
hash path_to_file                       - calculate hash for file

(4) Compress and decompress operations:
compress path_to_file path_to_destination    - compress file (using Brotli algorithm)
decompress path_to_file path_to_destination  - decompress file (using Brotli algorithm)
`;

export const helpLog = () => {
  console.log(HELP_MESSAGE);
};
