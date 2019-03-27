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
  PomegranatePlugin, CommonHooks, InjectableParameter, InjectableHooks
} from "../PluginTypes";

import {checkProp, createState} from "../builderMethods";

export type OverrideB = 'OverridePlugin'

export type OverrideConfigTypes = 'override'

export interface OverrideConfiguration extends CommonConfiguration<OverrideConfigTypes> {
  depends?: string[]
  provides?: string[]
  optional?: string[]
  frameworkPlugin?: boolean
}



export interface PomOverridePlugin<TInjectable = any> extends PomegranatePlugin {
  configuration: OverrideConfiguration
  hooks: InjectableHooks<TInjectable>
  directories?: PluginDirectories
  variables?: PluginVariables,
  commands?: PluginCommands
  overrides: string
  installs?: any
  dashboard?: any
}


export interface GeneratedOverride<TInjectable> extends GeneratedPlugin {
  builderType: OverrideB
  state: PomOverridePlugin<TInjectable>
}

export interface OverrideBuilder<TInjectable> {
  variables: (variables: PluginVariables) => OverrideBuilder<TInjectable>
  directories: (directories: PluginDirectories) => OverrideBuilder<TInjectable>
  configuration: (configuration: OverrideConfiguration) => OverrideBuilder<TInjectable>
  hooks: (hooks: InjectableHooks<TInjectable>) => OverrideBuilder<TInjectable>
  overrides: (override: string) => OverrideBuilder<TInjectable>
  commands: (commands: PluginCommands) => OverrideBuilder<TInjectable>
  installs: (installs: any) => OverrideBuilder<TInjectable>
  dashboard: (dashboard: any) => OverrideBuilder<TInjectable>
  getPlugin: () => GeneratedOverride<TInjectable>
}

export function isOverrideBuilder(builder: GeneratedPlugin): builder is GeneratedOverride<any> {
  return builder.builderType === 'OverridePlugin'
}

export const OverridePlugin = function <TInjectable = any>(pluginObject?: PomOverridePlugin<TInjectable>): OverrideBuilder<TInjectable> {
  return (function createPlugin(plugin) {

    let currentPlugin = createState('OverridePlugin', pluginObject, plugin)
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
      overrides: (overrides) => {
        checkProp(pluginObject, currentPlugin, 'overrides')
        currentPlugin.state.overrides = overrides
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