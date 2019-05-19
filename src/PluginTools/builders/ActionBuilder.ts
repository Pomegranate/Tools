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
  PomegranatePlugin, CommonHooks
} from "../PluginTypes";

import {ActionValidator} from "../Validation";
import {Builder} from "./Builder";

export type ActionB = 'ActionBuilder'

export type ActionPluginTypes = 'action'

export interface ActionConfiguration extends CommonConfiguration<ActionPluginTypes> {
  depends?: string[]
  provides?: string[]
  optional?: string[]
  frameworkPlugin?: boolean
}

export interface ActionHooks extends CommonHooks {
}

export interface PomActionPlugin extends PomegranatePlugin {
  configuration: ActionConfiguration
  hooks: ActionHooks
  directories?: PluginDirectories
  variables?: PluginVariables,
  commands?: PluginCommands
  installs?: any
  dashboard?: any
}

// export interface ActionBuilder {
//   variables: (variables: PluginVariables) => ActionBuilder
//   directories: (directories: PluginDirectories) => ActionBuilder
//   configuration: (configuration: ActionConfiguration) => ActionBuilder
//   hooks: (hooks: EffectHooks) => ActionBuilder
//   commands: (commands: PluginCommands) => ActionBuilder
//   installs: (installs: any) => ActionBuilder
//   dashboard: (dashboard: any) => ActionBuilder
//   getPlugin: () => GeneratedEffect
// }


type FluentActionB = 'ActionBuilder'

export interface FluentActionConfig {
  name: string,
  frameworkPlugin?: any,
  applicationMember?: string[]
  depends?: string[]
  provides?: string[]
  optional?: string[]
}

export class ActionBuilder extends Builder {
  builder: ActionB
  validator: any
  constructor(state: ActionPluginTypes | PomActionPlugin) {
    super(state)
    this.builder = 'ActionBuilder'
    this.validator = ActionValidator
  }

  configuration(configuration: FluentActionConfig) {
    return this.setState('configuration', configuration)
  }

  hooks(hooks: ActionHooks) {
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