# ga-file-list

GItHub Actions: List all Files

# List all files

This action prints lists all files and stores the output in an environment variable for later use.

It also saves as an json, for a later build matrix.

## Inputs

## `directory`

**Optional** The directory to look for the files. Default `"project root"`.
**Optional** File ending.

## Outputs

## `files`

The list of files

## `files_json`

The list of files as json

## Example usage

uses: actions/hello-world-javascript-action@v1.1
with:
who-to-greet: 'Mona the Octocat'
