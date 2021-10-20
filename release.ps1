# if ($args.count -eq 0) {
#     write-host "Specify release as argument"
# }
Param(
    [Parameter(Mandatory=$true)] 
    [string]$version
 
 ) #end param
cmd.exe /c npm run prepare
cmd.exe /c git add dist
cmd.exe /c git checkout -b $($version)
git commit -m "$($version) release"
git tag -a -m "$($version) release" "$($version)"
git push origin $($version) --follow-tags