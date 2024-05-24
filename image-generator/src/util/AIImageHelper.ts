export default class AIImageHelper {
	constructor(private AI: Ai) {}

	generateImage({ prompt }: { prompt: string }) {
		return this.AI.run('@cf/bytedance/stable-diffusion-xl-lightning', {
			prompt,
		})
	}

	enhanceImage({ image, prompt }: { image: ArrayBuffer; prompt: string }) {
		return this.AI.run('@cf/runwayml/stable-diffusion-v1-5-img2img', {
			prompt,
			image: [...new Uint8Array(image)],
		})
	}

	enhanceImageUsingMask({
		image,
		mask,
		prompt,
	}: {
		image: ArrayBuffer
		mask: ArrayBuffer
		prompt: string
	}) {
		return this.AI.run('@cf/runwayml/stable-diffusion-v1-5-inpainting', {
			prompt,
			image: [...new Uint8Array(image)],
			mask: [...new Uint8Array(mask)],
		})
	}
}
