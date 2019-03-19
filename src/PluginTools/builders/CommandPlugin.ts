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

export type CommandB = 'CommandPlugin'

export type CommandConfigTypes = 'command'

export interface CommandConfiguration extends CommonConfiguration<CommandConfigTypes> {
}

export interface PomCommandPlugin extends PomegranatePlugin {
  configuration: CommandConfiguration
  directories?: PluginDirectories
  variables?: PluginVariables,
  commands?: PluginCommands
  installs?: any
  dashboard?: any
}


export interface GeneratedCommand extends GeneratedPlugin {
  builderType: CommandB
  state: PomCommandPlugin
}

export interface CommandBuilder {
  variables: (variables: PluginVariables) => CommandBuilder
  directories: (directories: PluginDirectories) => CommandBuilder
  configuration: (configuration: CommandConfiguration) => CommandBuilder
  commands: (commands: PluginCommands) => CommandBuilder
  installs: (installs: any) => CommandBuilder
  dashboard: (dashboard: any) => CommandBuilder
  getPlugin: () => GeneratedCommand
}

export function isCommandBuilder(builder: GeneratedPlugin): builder is GeneratedCommand {
  return builder.builderType === 'CommandPlugin'
}

export const CommandPlugin = function <TInjectable = any>(pluginObject?: PomCommandPlugin): CommandBuilder {
  return (function createPlugin(plugin) {

    let currentPlugin = createState('CommandPlugin', pluginObject, plugin)
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