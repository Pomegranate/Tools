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
  PomegranatePlugin, CommonHooks, InjectableParameter, InjectableScope, InjectableHooks
} from "../PluginTypes";

import {ActionPluginTypes} from "./ActionBuilder"
import {FluentInjectableConfig, InjectablePluginTypes, PomInjectablePlugin} from "./InjectableBuilder"
import {LoghandlerPluginTypes} from "./LoghandlerBuilder"


import {checkProp, createState} from "../builderMethods";
import {Builder} from "./Builder";
import {merge} from "lodash/fp";

export type CompositeB = 'CompositeBuilder'

export type CompositePluginTypes = 'composite'


export interface CompositeConfiguration extends CommonConfiguration<CompositePluginTypes> {
  depends?: string[]
  provides?: string[]
  optional?: string[]
  frameworkPlugin?: boolean
}

export interface FluentCompositeConfig {
  name: string,
  frameworkPlugin?: any,
  injectableScope?: string
  applicationMember?: string[]
  depends?: string[]
  provides?: string[]
  optional?: string[]
}

export type ComposedPluginTypes = ActionPluginTypes | InjectablePluginTypes | LoghandlerPluginTypes | CompositePluginTypes

export interface compositeValue {
  injectableParam: string,
  injectableScope?: InjectableScope
  load: any,
  type?: ComposedPluginTypes
}

export interface CompositeHooks extends CommonHooks {
  load(...injectable: InjectableParameter[]): Promise<compositeValue[]> | compositeValue[]
}

export interface PomCompositePlugin extends PomegranatePlugin {
  configuration: CompositeConfiguration
  hooks: CompositeHooks
  directories?: PluginDirectories
  variables?: PluginVariables,
  commands?: PluginCommands
  installs?: any
  dashboard?: any
}

export class CompositeBuilder extends Builder {
  builder: CompositeB
  constructor(state: CompositePluginTypes | PomCompositePlugin) {
    super(state)
    this.builder = 'CompositeBuilder'

  }

  configuration(configuration: FluentCompositeConfig) {
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