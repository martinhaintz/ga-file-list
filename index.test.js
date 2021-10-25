const process = require('process');
const cp = require('child_process');
const path = require('path');
const fs = require('fs');

const fileName1 = "firstDummyFile"
const fileExtension1 = "yml"
const fileName2 = "secondDummyFile"
const fileExtension2 = "txt"
const fileName3 = "ignoreDummyFile"
const fileExtension3 = "json"
const fileName4 = "disabled_DummyFile"
const fileExtension4 = "txt"
const file1 = `${fileName1}.${fileExtension1}`
const file2 = `${fileName2}.${fileExtension2}`
const file3 = `${fileName3}.${fileExtension3}`
const file4 = `${fileName4}.${fileExtension4}`
const testDir = "testDir"
const ip = path.join(__dirname, 'index.js');

const outputFiles = "files";
const outputFileNames = "file_names";

const oldEnv = process.env

beforeAll(() => {
  createEmptyFile(file1);
  createEmptyFile(file2);

  if (fs.existsSync(testDir)) {
    fs.rmdirSync(testDir, { recursive: true, force: true });
  }
  fs.mkdirSync(testDir);
  createEmptyFile(`${testDir}/${file1}`);
  createEmptyFile(`${testDir}/${file2}`);
  createEmptyFile(`${testDir}/${file3}`);
  createEmptyFile(`${testDir}/${file4}`);
});

function createEmptyFile(filepath) {
  fs.closeSync(fs.openSync(filepath, 'w'));
}

afterAll(() => {
  fs.unlinkSync(file1)
  fs.unlinkSync(file2)

  fs.rmdirSync(testDir, { recursive: true, force: true });
});

beforeEach(() => {
  process.env = { ...oldEnv }
});


test('test get all files from root directory', () => {
  const result = cp.execSync(`node ${ip}`).toString();

  expect(result).toContain(outputFiles)
  expect(result).toContain(outputFileNames)

  expect(result).toContain(file1)
  expect(result).toContain(file2)

  expect(result).toContain(fileName1)
  expect(result).toContain(fileName2)
})

test('test get all files in specific directory', () => {
  process.env['INPUT_DIRECTORY'] = testDir;

  const result = cp.execSync(`node ${ip}`, { env: process.env }).toString();

  expect(result).toContain(outputFiles)
  expect(result).toContain(outputFileNames)

  expect(result).toContain(file1)
  expect(result).toContain(file2)

  expect(result).toContain(fileName1)
  expect(result).toContain(fileName2)
})

test('test get all files in specific directory with specific ending', () => {
  process.env['INPUT_DIRECTORY'] = testDir;
  process.env['INPUT_FILE_EXTENSION'] = "yml";

  const result = cp.execSync(`node ${ip}`, { env: process.env }).toString();

  expect(result).toContain(outputFiles)
  expect(result).toContain(outputFileNames)

  expect(result).toContain(file1)
  expect(result).not.toContain(file2)

  expect(result).toContain(fileName1)
  expect(result).not.toContain(fileName2)
})

test('test ignores files which starts with *ignore* or *disabled_*', () => {
  process.env['INPUT_DIRECTORY'] = testDir;
  process.env['INPUT_IGNORE_FILES_STARTS_WITH'] = "ignore;disabled_";
  process.env['INPUT_IGNORE_FILES_STARTS_WITH_DELIMITER'] = ";";

  const result = cp.execSync(`node ${ip}`, { env: process.env }).toString();

  expect(result).toContain(outputFiles)
  expect(result).toContain(outputFileNames)

  expect(result).toContain(file1)
  expect(result).toContain(file2)
  expect(result).not.toContain(file3)
  expect(result).not.toContain(file4)

  expect(result).toContain(fileName1)
  expect(result).toContain(fileName2)
  expect(result).not.toContain(fileName3)
  expect(result).not.toContain(fileName4)
})

test('test only files which starts with *second*', () => {
  process.env['INPUT_DIRECTORY'] = testDir;
  process.env['INPUT_ONLY_FILES_STARTS_WITH'] = "second";
  process.env['INPUT_ONLY_FILES_STARTS_WITH_DELIMITER'] = ",";

  const result = cp.execSync(`node ${ip}`, { env: process.env }).toString();

  expect(result).toContain(outputFiles)
  expect(result).toContain(outputFileNames)

  expect(result).not.toContain(file1)
  expect(result).toContain(file2)
  expect(result).not.toContain(file3)
  expect(result).not.toContain(file4)

  expect(result).not.toContain(fileName1)
  expect(result).toContain(fileName2)
  expect(result).not.toContain(fileName3)
  expect(result).not.toContain(fileName4)
})

