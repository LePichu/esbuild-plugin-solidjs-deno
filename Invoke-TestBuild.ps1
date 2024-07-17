$LIST = "dom", "ssr", "hydrate", @("dom", "true"), @("ssr", "true")

$LIST | % {
	deno run -A ./test/build.ts $_ | Set-Content "./output/$($_ -Join '-').output.js"
}
