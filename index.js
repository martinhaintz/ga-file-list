const core = require('@actions/core');
const fs = require('fs')
const path = require('path');

async function run() {
    try {
        let dir = core.getInput('directory', { required: false });
        let fileExtension = core.getInput('file_extension', { required: false }).toLowerCase();
        dir = "./".concat(dir)

        let content = fs.readdirSync(dir, { withFileTypes: true });
        let files = content.filter(currentElement => currentElement.isFile())
            .map(file => file.name);

        if (fileExtension)
            files = files.filter(currentFile => currentFile.toLowerCase().endsWith(`.${fileExtension}`))

        let fileNames = files.map(file => path.parse(`${dir}/${file}`).name);

        let filesJsonString = JSON.stringify(files)
        let fileNamesJsonString = JSON.stringify(fileNames)

        core.setOutput('files', filesJsonString);
        core.setOutput('file_names', fileNamesJsonString);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
