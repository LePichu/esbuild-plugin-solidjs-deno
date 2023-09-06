import { build } from "https://deno.land/x/esbuild@v0.19.2/mod.js"
import { SolidPlugin } from "../mod.ts"

const res = await build({
	entryPoints: [
		"./test/App.tsx",
	],
	format: "esm",
	target: "esnext",
	jsx: "preserve",
	plugins: [
		SolidPlugin({
			// deno-lint-ignore no-explicit-any
			generate: Deno.args[0] as any,
			hydrateable: Boolean(Deno.args[1])
		}),
	],
	write: false
})

for (const out of res.outputFiles) {
	console.log(out.text)
}

Deno.exit(res.errors.length > 0 ? 1 : 0)
