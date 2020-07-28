import installExtension, {VUEJS_DEVTOOLS} from "electron-devtools-installer";

export default async (isDevelopment = false) => {

  // Install Vue Devtools
  // Only on development
  if (isDevelopment) {
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {

      console.error('Vue Devtools failed to install:', e.toString())

    }
  }
}
