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
import {InjectablePluginTypes, PomInjectablePlugin} from "./InjectableBuilder";

export type OverrideB = 'OverrideBuilder'

export type OverridePluginTypes = 'override'

export interface OverrideConfiguration extends CommonConfiguration<OverridePluginTypes> {
  depends?: string[]
  provides?: string[]
  optional?: string[]
  frameworkPlugin?: boolean
}

export interface FluentOverrideConfig {
  name: string,
  frameworkPlugin?: any,
  depends?: string[]
  provides?: string[]
  optional?: string[]
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


export class OverrideBuilder extends Builder {
  builder: OverrideB
  constructor(state: OverridePluginTypes | PomOverridePlugin) {
    super(state)
    this.builder = 'OverrideBuilder'

  }

  configuration(configuration: FluentOverrideConfig) {
    return this.setState('configuration', configuration)
  }

  hooks<TInjectable>(hooks: InjectableHooks<TInjectable>) {
    return this.setState('hooks', hooks)
  }

  overrides(overrides){
    return this.setState('overrides', overrides)
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