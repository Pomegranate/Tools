/**
 * @file GenerateBuilder
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project PluginTools
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {has, keyBy, identity, assign, reduce, toPairs, keys, isFunction, isObject} from "lodash/fp";



export function checkProp(pluginObject, plugin, prop) {
  if (isObject(pluginObject)) {
    throw new Error('A complete object was provided, fluent methods cannot be called on this builder.')
  }
  if (has(prop, plugin.state)) {
    throw new Error(`.${prop}() has already been called on this builder.`)
  }

}

export function createState(builderType: string, pluginObject, plugin) {
  if (plugin === undefined) {
    return {
      builderType: builderType,
      state: pluginObject ? pluginObject : {}
    }
  }
  return plugin
}

