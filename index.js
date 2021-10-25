const core = require('@actions/core');
const fs = require('fs')
const path = require('path');

async function run() {
    try {
        let dir = core.getInput('directory', { required: false });
        const fileExtension = core.getInput('file_extension', { required: false }).toLowerCase();
        const onlyStartsWith = core.getInput('only_files_starts_with', { required: false });
        const onlyStartsWithDelimiter = core.getInput('only_files_starts_with_delimiter', { required: false });
        const ignoreStartsWith = core.getInput('ignore_files_starts_with', { required: false });
        const ignoreStartsWithDelimiter = core.getInput('ignore_files_starts_with_delimiter', { required: false });
        dir = "./".concat(dir)

        const content = fs.readdirSync(dir, { withFileTypes: true });
        let files = content.filter(currentElement => currentElement.isFile())
            .map(file => file.name);

        if (fileExtension)
            files = files.filter(currentFile => currentFile.toLowerCase().endsWith(`.${fileExtension}`))

        if (onlyStartsWith) {
            const onlyList = onlyStartsWith.split(onlyStartsWithDelimiter)
            onlyList.forEach(currentOnlyStartsWith => {
                files = files.filter(currentFile => currentFile.startsWith(currentOnlyStartsWith))
            });
        }

        if (ignoreStartsWith) {
            const ignoreList = ignoreStartsWith.split(ignoreStartsWithDelimiter)
            ignoreList.forEach(currentIgnoreStartsWith => {
                files = files.filter(currentFile => !currentFile.startsWith(currentIgnoreStartsWith))
            });
        }

        const fileNames = files.map(file => path.parse(`${dir}/${file}`).name);

        const filesJsonString = JSON.stringify(files)
        const fileNamesJsonString = JSON.stringify(fileNames)

        core.setOutput('files', filesJsonString);
        core.setOutput('file_names', fileNamesJsonString);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
