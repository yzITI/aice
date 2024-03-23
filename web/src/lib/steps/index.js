import { mdiCropSquare, mdiCloudQuestionOutline } from '@mdi/js'
import passComponent from './pass.svelte'
import gptComponent from './gpt.svelte'

export default {
  pass: {
    component: passComponent,
    icon: mdiCropSquare,
    template: {}
  },
  gpt: {
    component: gptComponent,
    icon: mdiCloudQuestionOutline,
    template: { model: 'gpt-3.5-turbo', prompt: 'Ask GPT something here', output: 'result' }
  }
}
