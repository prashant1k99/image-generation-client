import { Hono } from 'hono'
import { bodyLimit } from 'hono/body-limit'
import { cors } from 'hono/cors'
import AIImageHelper from './util/AIImageHelper'

type Bindings = {
	AI: Ai
}

const app = new Hono<{ Bindings: Bindings }>()

app.use(
	'*',
	cors({
		origin: '*',
		allowMethods: ['GET', 'POST', 'OPTIONS'],
		allowHeaders: ['Content-Type'],
	})
)

app.get('/', (c) => {
	return c.text('Hello')
})

// Route to get the image for the text
app.get('/generate', async (c) => {
	const query = c.req.query('q')

	if (!query) {
		return c.text('Bad Request', 400)
	}

	const aiImageHelper = new AIImageHelper(c.env.AI)

	const generatedImage = await aiImageHelper.generateImage({
		prompt: query,
	})

	return new Response(generatedImage, {
		headers: {
			'content-type': 'image/png',
		},
	})
})

app.post(
	'/enhance',
	bodyLimit({
		maxSize: 5 * 1024 * 1024, // 5MB
		onError: (c) => {
			return c.text('overflow :(', 413)
		},
	}),
	async (c) => {
		const body = await c.req.parseBody()
		const enhancementPrompt = body['prompt'] as string

		if (!enhancementPrompt) {
			return c.json({ error: 'Prompt is required' }, 400)
		}

		if (!(body['image'] instanceof File)) {
			return c.text('Bad Request', 400)
		}

		const file = body['image'] as unknown as File
		const image = await file.arrayBuffer()

		const aiImageHelper = new AIImageHelper(c.env.AI)

		const enhancedImage = await aiImageHelper.enhanceImage({
			image,
			prompt: enhancementPrompt,
		})

		return new Response(enhancedImage, {
			headers: {
				'content-type': 'image/png',
			},
		})
	}
)

app.post(
	'/enhance-mask',
	bodyLimit({
		maxSize: 10 * 1024 * 1024, // 10MB
		onError: (c) => {
			return c.text('overflow :(', 413)
		},
	}),
	async (c) => {
		const body = await c.req.parseBody()
		const enhancementPrompt = body['prompt'] as string

		if (!enhancementPrompt) {
			return c.json({ error: 'Prompt is required' }, 400)
		}

		if (!(body['image'] instanceof File) || !(body['mask'] instanceof File)) {
			return c.text('Bad Request', 400)
		}

		const imageFile = body['image'] as unknown as File
		const maskFile = body['mask'] as unknown as File

		const image = await imageFile.arrayBuffer()
		const mask = await maskFile.arrayBuffer()

		const aiImageHelper = new AIImageHelper(c.env.AI)

		const enhancedImage = await aiImageHelper.enhanceImageUsingMask({
			image,
			mask,
			prompt: enhancementPrompt,
		})

		return new Response(enhancedImage, {
			headers: {
				'content-type': 'image/png',
			},
		})
	}
)

app.all('*', (c) => {
	return c.text('Not Found', 404)
})

export default app
