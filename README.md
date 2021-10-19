# Lists all Files (in optional Subdirectory)

<p align="center">
  <a href="https://github.com/actions/javascript-action/actions"><img alt="javscript-action status" src="https://github.com/actions/javascript-action/workflows/units-test/badge.svg"></a>
</p>

This small and simple plugin lists all files of a directory and returns the output as json.
This json can be later used for a dynamic build matrix.

## Inputs

## `directory`

**Optional** The directory to look for the files. Default `"project root"`.

## `file_extension`

**Optional** File extension. (e.g., "txt","yml")

## Outputs

## `files`

The list of files including file extension as json

## `file_names`

The list of files names without file extension as json

## Usage

```yaml
uses: the-coding-turtle/ga-file-list@v0.1
```

```yaml
uses: the-coding-turtle/ga-file-list@v0.1
with:
  directory: "configs"
  file_extension: "yml"
```
