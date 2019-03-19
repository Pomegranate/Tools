/**
 * @file LoghandlerPlugin
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
  PomegranatePlugin, CommonHooks, InjectableParameter, LogHandler, LogMessage, LoggerData
} from "../PluginTypes";

import {checkProp, createState} from "../builderMethods";

export type LoghandlerB = 'InjectablePlugin'

export type LoghandlerConfigTypes = 'loghandler'

export interface LoghandlerConfiguration extends CommonConfiguration<LoghandlerConfigTypes> {
  depends?: string[]
  provides?: string[]
  optional?: string[]
  frameworkPlugin?: boolean
}

export interface LoghandlerHooks extends CommonHooks {
  load(...injectable: InjectableParameter[]): Promise<LogHandler> | LogHandler
}

interface PomLogHandlerPlugin extends PomegranatePlugin {
  configuration: LoghandlerConfiguration
  hooks: LoghandlerHooks
  directories?: PluginDirectories
  variables?: PluginVariables,
  commands?: PluginCommands
  installs?: any
  dashboard?: any
}


export interface GeneratedLoghandler extends GeneratedPlugin {
  builderType: LoghandlerB
  state: PomLogHandlerPlugin
}

export interface LoghandlerBuilder {
  variables: (variables: PluginVariables) => LoghandlerBuilder
  directories: (directories: PluginDirectories) => LoghandlerBuilder
  configuration: (configuration: LoghandlerConfiguration) => LoghandlerBuilder
  hooks: (hooks: LoghandlerHooks) => LoghandlerBuilder
  commands: (commands: PluginCommands) => LoghandlerBuilder
  installs: (installs: any) => LoghandlerBuilder
  dashboard: (dashboard: any) => LoghandlerBuilder
  getPlugin: () => GeneratedLoghandler
}

export function isLoghandlerBuilder(builder: GeneratedPlugin): builder is GeneratedLoghandler {
  return builder.builderType === 'LoghandlerPlugin'
}

export const LoghandlerPlugin = function(pluginObject?: PomLogHandlerPlugin): LoghandlerBuilder {
  return (function createPlugin(plugin) {

    let currentPlugin = createState('LoghandlerPlugin', pluginObject, plugin)
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