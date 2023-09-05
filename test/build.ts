import { build } from "https://deno.land/x/esbuild/mod.js"
import { SolidPlugin } from "../mod.ts"

const res = await build({
	entryPoints: [
		"./test/App.jsx",
	],
	format: "esm",
	target: "esnext",
	jsx: "preserve",
	plugins: [
		SolidPlugin,
	],
	write: false,
})

for (let out of res.outputFiles) {
	console.log(out.text)
}

Deno.exit(res.errors.length > 0 ? 1 : 0)