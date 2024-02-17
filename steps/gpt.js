import OpenAI from 'openai'
import config from '../config.js'

const openai = new OpenAI(config.openai)

export default async (step, state, resource) => {
  const result = {}
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: step.prompt }],
    model: step.model
  })

  state[step.output] = completion.choices[0]
  result.ok = true
  result.next = step.next
  return result
}
