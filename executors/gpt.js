// step{ model, prompt, output, next }
import OpenAI from 'openai'
import config from '../config.js'

const openai = new OpenAI(config.openai)

export default async (step, state, log) => {
  const result = { next: step.next }
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: step.prompt }],
      model: step.model
    })
    state[step.output] = completion.choices[0]
  } catch (e) {
    result.error = e.toString()
    return result
  }
  result.ok = true
  return result
}
