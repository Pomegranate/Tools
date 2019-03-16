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

export type InjectableB = 'InjectablePlugin'

export type InjectableConfigTypes =
  'anything' |
  'composite' |
  'factory' |
  'instance' |
  'merge'

export interface InjectableConfiguration extends CommonConfiguration<InjectableConfigTypes> {
  injectableParam: string
  depends?: string[]
  provides?: string[]
  optional?: string[]
  frameworkPlugin?: boolean
}

export interface InjectableHooks<T> extends CommonHooks {
  load(...injectable: InjectableParameter[]): Promise<T> | T
}

interface PomInjectablePlugin<TInjectable = any> extends PomegranatePlugin {
  configuration: InjectableConfiguration
  hooks: InjectableHooks<TInjectable>
  directories?: PluginDirectories
  variables?: PluginVariables,
  commands?: PluginCommands
  installs?: any
  dashboard?: any
}


export interface GeneratedInjectable<TInjectable> extends GeneratedPlugin {
  builderType: InjectableB
  state: PomInjectablePlugin<TInjectable>
}

interface InjectableBuilder<TInjectable> {
  variables: (variables: PluginVariables) => InjectableBuilder<TInjectable>
  directories: (directories: PluginDirectories) => InjectableBuilder<TInjectable>
  configuration: (configuration: InjectableConfiguration) => InjectableBuilder<TInjectable>
  hooks: (hooks: InjectableHooks<TInjectable>) => InjectableBuilder<TInjectable>
  commands: (commands: PluginCommands) => InjectableBuilder<TInjectable>
  installs: (installs: any) => InjectableBuilder<TInjectable>
  dashboard: (dashboard: any) => InjectableBuilder<TInjectable>
  getPlugin: () => GeneratedInjectable<TInjectable>
}

export function isInjectableBuilder(builder: GeneratedPlugin): builder is GeneratedInjectable<any> {
  return builder.builderType === 'InjectablePlugin'
}

export const InjectablePlugin = function <TInjectable = any>(pluginObject?: PomInjectablePlugin<TInjectable>): InjectableBuilder<TInjectable> {
  return (function createPlugin(plugin) {

    let currentPlugin = createState('InjectablePlugin', pluginObject, plugin)
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