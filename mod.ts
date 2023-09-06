// @deno-types="https://esm.sh/v132/@types/babel__core@7.20.1/index.d.ts"
import { transformAsync } from "https://esm.sh/@babel/core@7.22.15"
import ts from "https://esm.sh/@babel/preset-typescript@7.21.4-esm.4"
import solid from "https://esm.sh/babel-preset-solid@1.7.7"
import { type Plugin } from "https://deno.land/x/esbuild@v0.19.2/mod.js"

export interface SolidPluginOptions {
	generate?: "dom" | "ssr" | "hydrate"
	hydrateable?: boolean
}

export function SolidPlugin(options: SolidPluginOptions = {}): Plugin {
	return {
		"name": "esbuild-plugin-solid-deno",
		"setup": (build) => {
			build.onLoad({ filter: /\.(js|ts)x$/ }, async (args) => {
				const code = await Deno.readTextFile(args.path)
				const transforms = await transformAsync(code, {
					filename: args.path,
					presets: [
						[solid, options!],
						[
							ts,
							build.initialOptions.tsconfig
								? JSON.parse(build.initialOptions.tsconfig)
								: build.initialOptions.tsconfig ?? {},
						],
					],
				})

				return {
					"contents": transforms!.code!,
					"loader": "js",
				}
			})
		},
	}
}
