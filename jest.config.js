export const transform = {
  // This line tells Jest to use babel-jest for all .js, .jsx, .ts, and .tsx files
  '^.+\\.(t|j)sx?$': 'babel-jest',
};
export const moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx', 'json', 'node'];