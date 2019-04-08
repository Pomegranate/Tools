/**
 * @file CreatePlugin
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project PluginTools
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */
import {includes, isObject} from 'lodash/fp'
import {ApplicationPluginTypes, ApplicationBuilder, PomApplicationPlugin,} from './builders/ApplicationBuilder'
import {CommandPluginTypes, CommandBuilder, PomCommandPlugin} from "./builders/CommandBuilder";
import {CompositePluginTypes, CompositeBuilder, PomCompositePlugin} from "./builders/CompositeBuilder";
import {ActionBuilder, ActionPluginTypes, PomActionPlugin} from "./builders/ActionBuilder";
import {InjectableBuilder, InjectablePluginTypes, PomInjectablePlugin} from "./builders/InjectableBuilder";
import {LoghandlerBuilder, LoghandlerPluginTypes, PomLogHandlerPlugin} from "./builders/LoghandlerBuilder";
import {OverridePluginTypes, OverrideBuilder, PomOverridePlugin} from "./builders/OverrideBuilder";
import {PomegranatePlugin} from "./PluginTypes";

export type BuildableType =
  ApplicationPluginTypes |
  CompositePluginTypes |
  CommandPluginTypes |
  ActionPluginTypes |
  InjectablePluginTypes |
  LoghandlerPluginTypes |
  OverridePluginTypes


let buildableTypes = ['action', 'anything', 'application', 'command', 'composite', 'factory', 'instance', 'loghandler', 'merge', 'override']

export function isBuildableType(builderName: string | PomegranatePlugin): builderName is BuildableType {
  return includes(builderName, buildableTypes)
}

export function isPomegranateType(pomPlugin: PomegranatePlugin | any): pomPlugin is PomegranatePlugin {
  return isObject(pomPlugin) && isObject(pomPlugin.configuration)
}


function createFluent(builderType: BuildableType) {
  switch (builderType) {
    case 'action':
      return new ActionBuilder(builderType)
    case 'application':
      return new ApplicationBuilder(builderType)
    case 'anything':
    case 'factory':
    case 'instance':
    case 'merge':
      return new InjectableBuilder(builderType)
    case 'loghandler':
      return new LoghandlerBuilder(builderType)
    case 'command':
      return new CommandBuilder(builderType)
    case 'composite':
      return new CompositeBuilder(builderType)
    case 'override':
      return new OverrideBuilder(builderType)
    default:
      throw new Error(`No builder found for ${builderType}`)
  }
}

function createComplete(fullPlugin: PomegranatePlugin) {
  switch (fullPlugin.configuration.type) {
    case 'action':
      return new ActionBuilder(<PomActionPlugin>fullPlugin)
    case 'application':
      return new ApplicationBuilder(<PomApplicationPlugin>fullPlugin)
    case 'anything':
    case 'factory':
    case 'instance':
    case 'merge':
      return new InjectableBuilder(<PomInjectablePlugin>fullPlugin)
    case 'loghandler':
      return new LoghandlerBuilder(<PomLogHandlerPlugin>fullPlugin)
    case 'command':
      return new CommandBuilder(<PomCommandPlugin>fullPlugin)
    case 'composite':
      return new CompositeBuilder(<PomCompositePlugin>fullPlugin)
    case 'override':
      return new OverrideBuilder(<PomOverridePlugin>fullPlugin)
    default:

  }
}

export function CreatePlugin(builderType: ActionPluginTypes): ActionBuilder
export function CreatePlugin(builderType: PomActionPlugin): ActionBuilder

export function CreatePlugin(builderType: ApplicationPluginTypes): ApplicationBuilder
export function CreatePlugin(builderType: PomApplicationPlugin): ApplicationBuilder

export function CreatePlugin(builderType: InjectablePluginTypes): InjectableBuilder
export function CreatePlugin(builderType: PomInjectablePlugin): InjectableBuilder

export function CreatePlugin(builderType: CommandPluginTypes): CommandBuilder
export function CreatePlugin(builderType: PomCommandPlugin): CommandBuilder

export function CreatePlugin(builderType: CompositePluginTypes): CompositeBuilder
export function CreatePlugin(builderType: PomCompositePlugin): CompositeBuilder

export function CreatePlugin(builderType: LoghandlerPluginTypes): LoghandlerBuilder
export function CreatePlugin(builderType: PomLogHandlerPlugin): LoghandlerBuilder

export function CreatePlugin(builderType: OverridePluginTypes): OverrideBuilder
export function CreatePlugin(builderType: PomOverridePlugin): OverrideBuilder

export function CreatePlugin(builderType: BuildableType | PomegranatePlugin) {

  if (isBuildableType(builderType)) {
    return createFluent(builderType)

  }

  if (isPomegranateType(builderType)) {
    return createComplete(builderType)
  }

  throw new Error(`Unable to find a Pomegranate plugin type with the name ${builderType}
    available types are "action, anything, application, command, composite, factory, instance, loghandler, merge and override"`)


}
