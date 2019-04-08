/**
 * @file InjectablePlugin
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project PluginTools
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */


import {
  CommonConfiguration,
  GeneratedPlugin,
  InjectableHooks,
  InjectableScope,
  PluginCommands,
  PluginDirectories,
  PluginVariables,
  PomegranatePlugin
} from "../PluginTypes";

import {Builder} from "./Builder";
import {merge} from "lodash/fp";

export type InjectableB = 'InjectableBuilder'

export type InjectablePluginTypes =
  'anything' |
  'factory' |
  'instance' |
  'merge'

export interface InjectableConfiguration extends CommonConfiguration<InjectablePluginTypes> {
  injectableParam: string
  injectableScope?: InjectableScope
  depends?: string[]
  provides?: string[]
  optional?: string[]
  frameworkPlugin?: boolean
}

export interface FluentInjectableConfig {
  name: string,
  frameworkPlugin?: any,
  injectableParam: string,
  injectableScope?: string
  depends?: string[]
  provides?: string[]
  optional?: string[]
}

export interface PomInjectablePlugin<TInjectable = any> extends PomegranatePlugin {
  configuration: InjectableConfiguration
  hooks: InjectableHooks<TInjectable>
  directories?: PluginDirectories
  variables?: PluginVariables,
  commands?: PluginCommands
  installs?: any
  dashboard?: any
}

export class InjectableBuilder extends Builder {
  builder: InjectableB
  constructor(state: InjectablePluginTypes | PomInjectablePlugin) {
    super(state)
    this.builder = 'InjectableBuilder'

  }

  configuration(configuration: FluentInjectableConfig) {
    return this.setState('configuration', configuration)
  }

  hooks<TInjectable>(hooks: InjectableHooks<TInjectable>) {
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