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
import {Builder} from "./Builder";
import {merge} from "lodash/fp";
import {FluentInjectableConfig, InjectablePluginTypes, PomInjectablePlugin} from "./InjectableBuilder";

export type CommandB = 'CommandBuilder'

export type CommandPluginTypes = 'command'

export interface CommandConfiguration extends CommonConfiguration<CommandPluginTypes> {
}

export interface FluentCommandConfig {
  name: string
  frameworkPlugin?: boolean
}

export interface PomCommandPlugin extends PomegranatePlugin {
  configuration: CommandConfiguration
  directories?: PluginDirectories
  variables?: PluginVariables,
  commands?: PluginCommands
  installs?: any
  dashboard?: any
}



export class CommandBuilder extends Builder {
  builder: CommandB
  constructor(state: CommandPluginTypes | PomCommandPlugin) {
    super(state)
    this.builder = 'CommandBuilder'

  }

  configuration(configuration: FluentCommandConfig) {
    return this.setState('configuration', configuration)
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