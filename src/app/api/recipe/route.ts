import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients.
You don't need to use every ingredient they mention in your recipe.
The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients.
Format your response in markdown to make it easier to render to a web page.
`.trim()

const BodySchema = z.object({
  ingredients: z.array(z.string().min(1).max(50)).min(1).max(30),
})

export async function POST(req: Request) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response('Anthropic API key not configured', { status: 500 })
    }

    const json = await req.json()

    const parsed = BodySchema.safeParse(json)
    if (!parsed.success) {
      return new Response('Invalid request body', { status: 400 })
    }

    const ingredientsString = parsed.data.ingredients.join(', ')

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY as string,
    })

    const msg = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
    })

    const text = msg.content?.[0]?.type === 'text' ? msg.content[0].text : ''

    return NextResponse.json({ recipe: text })
  } catch (err: any) {
    return NextResponse.json(
      {
        error: 'Failed to generate recipe',
        details: err?.message ?? String(err),
      },
      { status: 500 },
    )
  }
}
