# Lists all Files (in optional Subdirectory)

<p align="center">
  <a href="https://github.com/the-coding-turtle/ga-file-list/actions"><img alt="javscript-action status" src="https://github.com/the-coding-turtle/ga-file-list/actions/workflows/test.yml/badge.svg"></a>
</p>

This small and simple plugin lists all files of a directory and returns the output as json.
This json can be later used for a dynamic build matrix.

## Inputs

## `directory`

**Optional** The directory to look for the files. Default `"project root"`.

## `file_extension`

**Optional** File extension filter. (e.g., "txt","yml")

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

## Matrix Build / Multi-Tenancy for Google AppEngine (My use case)
```
name: Multi Tenant GAE Deploy

on:
  push:  
  workflow_dispatch:

jobs:
  lookup:
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.filelist.outputs.file_names }}
    steps:
    - uses: actions/checkout@v2
    - name: Get all yaml files
      id: filelist
      uses: the-coding-turtle/ga-file-list@v0.1
      with:
        directory: "gae_yaml"
        file_extension: "yaml"
        
  multi_tenant:
    needs: lookup
    runs-on: ubuntu-latest
    strategy:
      matrix:
        tenant: ${{fromJson(needs.lookup.outputs.matrix)}}
    steps:
    - uses: actions/checkout@v2
    - name: Show all tenants
      run: |
        echo "this is tenant: ${{ matrix.TENANT }}"
```
