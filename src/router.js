import * as controllers from './controllers'

export default function router(app) {
  for (const key in controllers) {
    if (controllers.hasOwnProperty(key)) {
      const fxn = controllers[key];
      fxn(app)
    }
  }
}