/**
 * @file InjectablePlugin
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project PluginTools
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */


import {
  CommonConfiguration,
  PluginDirectories,
  PluginCommands,
  PluginVariables,
  GeneratedPlugin,
  PomegranatePlugin, CommonHooks, InjectableParameter
} from "../PluginTypes";

import {EffectConfigTypes} from "./EffectPlugin"
import {InjectableConfigTypes} from "./InjectablePlugin"
import {LoghandlerConfigTypes} from "./LoghandlerPlugin"


import {checkProp, createState} from "../builderMethods";

export type CompositeB = 'CompositePlugin'

export type CompositeConfigTypes = 'composite'


export interface CompositeConfiguration extends CommonConfiguration<CompositeConfigTypes> {
  depends?: string[]
  provides?: string[]
  optional?: string[]
  frameworkPlugin?: boolean
}

export type CompositePluginTypes = EffectConfigTypes | InjectableConfigTypes | LoghandlerConfigTypes | CompositeConfigTypes

export interface compositeValue {
  injectableParam: string,
  load: any,
  type?: CompositePluginTypes
}

export interface CompositeHooks extends CommonHooks {
  load(...injectable: InjectableParameter[]): Promise<compositeValue[]> | compositeValue[]
}

export interface PomCompositePlugin extends PomegranatePlugin {
  configuration: CompositeConfiguration
  hooks: CompositeHooks
  directories?: PluginDirectories
  variables?: PluginVariables,
  commands?: PluginCommands
  installs?: any
  dashboard?: any
}


export interface GeneratedComposite extends GeneratedPlugin {
  builderType: CompositeB
  state: PomCompositePlugin
}

export interface CompositeBuilder {
  variables: (variables: PluginVariables) => CompositeBuilder
  directories: (directories: PluginDirectories) => CompositeBuilder
  configuration: (configuration: CompositeConfiguration) => CompositeBuilder
  hooks: (hooks: CompositeHooks) => CompositeBuilder
  commands: (commands: PluginCommands) => CompositeBuilder
  installs: (installs: any) => CompositeBuilder
  dashboard: (dashboard: any) => CompositeBuilder
  getPlugin: () => GeneratedComposite
}

export function isCompositeBuilder(builder: GeneratedPlugin): builder is GeneratedComposite {
  return builder.builderType === 'CompositePlugin'
}

export const CompositePlugin = function(pluginObject?: PomCompositePlugin): CompositeBuilder {
  return (function createPlugin(plugin) {

    let currentPlugin = createState('CompositePlugin', pluginObject, plugin)
    return {
      variables: (variables) => {
        checkProp(pluginObject, currentPlugin, 'variables')
        currentPlugin.state.variables = variables
        return createPlugin(currentPlugin)
      },
      directories: (directories) => {
        checkProp(pluginObject, currentPlugin, 'directories')
        currentPlugin.state.directories = directories
        return createPlugin(currentPlugin)
      },
      configuration: (configuration) => {
        checkProp(pluginObject, currentPlugin, 'configuration')
        currentPlugin.state.configuration = configuration
        return createPlugin(currentPlugin)
      },
      hooks: (hooks) => {
        checkProp(pluginObject, currentPlugin, 'hooks')
        currentPlugin.state.hooks = hooks
        return createPlugin(currentPlugin)
      },
      commands: (commands) => {
        checkProp(pluginObject, currentPlugin, 'commands')
        currentPlugin.state.commands = commands
        return createPlugin(plugin)
      },
      installs: (installs) => {
        checkProp(pluginObject, plugin, 'installs')
        currentPlugin.state.installs = installs
        return createPlugin(currentPlugin)
      },
      dashboard: (dashboard) => {
        checkProp(pluginObject, plugin, 'dashboard')
        currentPlugin.state.installs = dashboard
        return createPlugin(currentPlugin)
      },
      getPlugin: () => {
        return currentPlugin
      }
    }
  })()
}