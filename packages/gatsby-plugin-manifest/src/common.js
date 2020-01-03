import fs from "fs"
import sysPath, { basename, join } from "path"

const _defaultIcons = [
  {
    src: `icons/icon-48x48.png`,
    sizes: `48x48`,
    type: `image/png`,
  },
  {
    src: `icons/icon-72x72.png`,
    sizes: `72x72`,
    type: `image/png`,
  },
  {
    src: `icons/icon-96x96.png`,
    sizes: `96x96`,
    type: `image/png`,
  },
  {
    src: `icons/icon-144x144.png`,
    sizes: `144x144`,
    type: `image/png`,
  },
  {
    src: `icons/icon-192x192.png`,
    sizes: `192x192`,
    type: `image/png`,
  },
  {
    src: `icons/icon-256x256.png`,
    sizes: `256x256`,
    type: `image/png`,
  },
  {
    src: `icons/icon-384x384.png`,
    sizes: `384x384`,
    type: `image/png`,
  },
  {
    src: `icons/icon-512x512.png`,
    sizes: `512x512`,
    type: `image/png`,
  },
]

/**
 * Returns the default icon configuration, optionally with custom directory name
 *
 * @param {String} dirName (optional) override the default directory name for icons
 */
exports.defaultIcons = dirName => {
  if (!dirName) {
    return _defaultIcons
  }

  return _defaultIcons.map(icon => {
    const fileName = basename(icon.src)
    icon.src = join(dirName, fileName)
    return icon
  })
}

/**
 * Check if the icon exists on the filesystem
 *
 * @param {String} srcIcon Path of the icon
 */
exports.doesIconExist = function doesIconExist(srcIcon) {
  try {
    return fs.statSync(srcIcon).isFile()
  } catch (e) {
    if (e.code !== `ENOENT`) {
      throw e
    }

    return false
  }
}

/**
 * @param {string} path The generic path to an icon
 * @param {string} digest The digest of the icon provided in the plugin's options.
 */
exports.addDigestToPath = function(path, digest, method) {
  if (method === `name`) {
    const parsedPath = sysPath.parse(path)

    return `${parsedPath.dir}/${parsedPath.name}-${digest}${parsedPath.ext}`
  }

  if (method === `query`) {
    return `${path}?v=${digest}`
  }

  return path
}
