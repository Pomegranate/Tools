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
  PomegranatePlugin, CommonHooks, InjectableParameter, LogHandler, LogMessage, LoggerData, InjectableHooks
} from "../PluginTypes";

import {checkProp, createState} from "../builderMethods";
import {Builder} from "./Builder";
import {merge} from "lodash/fp";
import {InjectablePluginTypes, PomInjectablePlugin} from "./InjectableBuilder";
import {LoghandlerValidator} from "../Validation";

export type LoghandlerB = 'LoghandlerBuilder'

export type LoghandlerPluginTypes = 'loghandler'

export interface LoghandlerConfiguration extends CommonConfiguration<LoghandlerPluginTypes> {
  depends?: string[]
  provides?: string[]
  optional?: string[]
  frameworkPlugin?: boolean
}

export interface FluentLoghandlerConfig {
  name: string,
  frameworkPlugin?: any,
  depends?: string[]
  provides?: string[]
  optional?: string[]
}

export interface LoghandlerHooks extends CommonHooks {
  load(...injectable: InjectableParameter[]): Promise<LogHandler> | LogHandler
}

export interface PomLogHandlerPlugin extends PomegranatePlugin {
  configuration: LoghandlerConfiguration
  hooks: LoghandlerHooks
  directories?: PluginDirectories
  variables?: PluginVariables,
  commands?: PluginCommands
  installs?: any
  dashboard?: any
}


export class LoghandlerBuilder extends Builder {
  builder: LoghandlerB
  validator: any
  constructor(state: LoghandlerPluginTypes | PomLogHandlerPlugin) {
    super(state)
    this.builder = 'LoghandlerBuilder'
    this.validator = LoghandlerValidator
  }

  configuration(configuration: FluentLoghandlerConfig) {
    return this.setState('configuration', configuration)
  }

  hooks(hooks: LoghandlerHooks) {
    return this.setState('hooks', hooks)
  }

  variables(variables: PluginVariables){
    return this.setState('variables', variables)
  }
  directories (directories: PluginDirectories) {
    return this.setState('directories', directories)
  }

  commands (commands: PluginCommands) {
    return this.setState('commands', commands)
  }
  installs (installs) {
    return this.setState('installs', installs)
  }
  dashboard (dashboard) {
    return this.setState('dashboard', dashboard)
  }

}