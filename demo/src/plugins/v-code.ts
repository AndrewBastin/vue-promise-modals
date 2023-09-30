import { Directive, Plugin } from "vue"
import { getHighlighter, BuiltinLanguage } from "shikiji"

const directiveDef: Directive<
  HTMLElement,
  BuiltinLanguage
> = async (el, binding) => {
  const shiki = await getHighlighter({
    langs: [binding.value],
    themes: ["vitesse-dark"]
  })
  
  el.innerHTML = shiki.codeToHtml(el?.textContent ?? "", {
    lang: binding.value,
    theme: "vitesse-dark"
  })
}

export const vCodePlugin: Plugin = {
  install(app) {
    app.directive("code", directiveDef)
  }
}