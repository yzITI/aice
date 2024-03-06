// step{ next }

export default async (step, state, log) => {
  return { ok: true, next: step.next }
}
