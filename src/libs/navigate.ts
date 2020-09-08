import i18n from '../i18n'
import router from './../router'

export default function navigate (path: string) {
  const localePath = `/${i18n.locale}${path}`
  if (router.currentRoute.path !== localePath) { router.push(localePath) }
}
