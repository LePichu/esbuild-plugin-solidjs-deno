import { registerPreset, transform } from "https://esm.sh/@babel/standalone"
import solid from "https://esm.sh/babel-preset-solid@1.7.7"
import { type Plugin } from "https://deno.land/x/esbuild/mod.js"

registerPreset("solid", solid())

export const SolidPlugin: Plugin = {
	"name": "esbuild-plugin-solid-deno",
	"setup": (build) => {
		build.onLoad({ filter: /\.(js|ts)x$/ }, async (args) => {
			const code = await Deno.readTextFile(args.path)
			const transforms = transform(code, {
				presets: [
					"solid",
				],
			})

			return {
				"contents": transforms.code!,
				"loader": "js",
			}
		})
	},
}
