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

import {checkProp, createState} from "../builderMethods";

export type EffectB = 'EffectPlugin'

export type EffectConfigTypes = 'action' | 'override'

export interface EffectConfiguration extends CommonConfiguration<EffectConfigTypes> {
  depends?: string[]
  provides?: string[]
  optional?: string[]
  frameworkPlugin?: boolean
}

export interface EffectHooks extends CommonHooks {
}

interface PomEffectPlugin extends PomegranatePlugin {
  configuration: EffectConfiguration
  hooks: EffectHooks
  directories?: PluginDirectories
  variables?: PluginVariables,
  commands?: PluginCommands
  installs?: any
  dashboard?: any
}


export interface GeneratedEffect extends GeneratedPlugin {
  builderType: EffectB
  state: PomEffectPlugin
}

export interface EffectBuilder {
  variables: (variables: PluginVariables) => EffectBuilder
  directories: (directories: PluginDirectories) => EffectBuilder
  configuration: (configuration: EffectConfiguration) => EffectBuilder
  hooks: (hooks: EffectHooks) => EffectBuilder
  commands: (commands: PluginCommands) => EffectBuilder
  installs: (installs: any) => EffectBuilder
  dashboard: (dashboard: any) => EffectBuilder
  getPlugin: () => GeneratedEffect
}

export function isEffectBuilder(builder: GeneratedPlugin): builder is GeneratedEffect {
  return builder.builderType === 'EffectPlugin'
}

export const EffectPlugin = function(pluginObject?: PomEffectPlugin): EffectBuilder {
  return (function createPlugin(plugin) {

    let currentPlugin = createState('EffectPlugin', pluginObject, plugin)
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