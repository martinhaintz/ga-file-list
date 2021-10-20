Param(
    [Parameter(Mandatory=$true)] 
    [string]$version
 
 ) #end param
cmd.exe /c npm run prepare
cmd.exe /c git add dist
cmd.exe /c git checkout -b $($version)
git commit -m "$($version) release"
git tag -a -m "$($version) release" "$($version)"
git push --atomic origin refs/heads/$($version):refs/heads/$($version)