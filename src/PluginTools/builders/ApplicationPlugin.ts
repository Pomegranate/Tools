/**
 * @file ApplicationPlugin
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project PluginTools
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {
  CommonBuilder,
  CommonConfiguration,
  GeneratedPlugin,
  PomegranatePlugin
} from "../PluginTypes";

import {checkProp, createState} from "../builderMethods";

export type ApplicationB = 'ApplicationPlugin'

export type ApplicationConfigTypes = 'application'

export interface ApplicationConfiguration extends CommonConfiguration<ApplicationConfigTypes> {
}

interface PomApplicationPlugin extends PomegranatePlugin {
  configuration: ApplicationConfiguration
  applicationPlugins: CommonBuilder[]
}

export interface GeneratedApplication extends GeneratedPlugin {
  builderType: ApplicationB
  state: PomApplicationPlugin
}

interface ApplicationBuilder {
  configuration: (configuration: ApplicationConfiguration) => ApplicationBuilder
  applicationPlugins: (applicationPlugins: CommonBuilder[]) => ApplicationBuilder
  getPlugin: () => GeneratedApplication
}

export function isApplicationBuilder(builder: GeneratedPlugin): builder is GeneratedApplication {
  return builder.builderType === 'ApplicationPlugin'
}

export const ApplicationPlugin = function(pluginObject?: PomApplicationPlugin): ApplicationBuilder {
  return (function createPlugin(plugin) {

    let currentPlugin = createState('ApplicationPlugin', pluginObject, plugin)
    return {
      configuration: (configuration) => {
        checkProp(pluginObject, currentPlugin, 'configuration')
        currentPlugin.state.configuration = configuration
        return createPlugin(currentPlugin)
      },
      applicationPlugins: (applicationPlugins) => {
        checkProp(pluginObject, currentPlugin,'applicationPlugins')
        currentPlugin.state.applicationPlugins = applicationPlugins
        return createPlugin(plugin)
      },
      getPlugin: () => {
        return currentPlugin
      }
    }
  })()
}