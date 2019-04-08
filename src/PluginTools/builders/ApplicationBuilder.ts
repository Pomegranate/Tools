/**
 * @file ApplicationPlugin
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project PluginTools
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */
import {merge} from 'lodash/fp'
import {Builder} from './Builder'
import {CommonBuilder, CommonConfiguration, PomegranatePlugin} from "../PluginTypes";

export type ApplicationB = 'ApplicationBuilder'

export type ApplicationPluginTypes = 'application'

export interface ApplicationConfiguration extends CommonConfiguration<ApplicationPluginTypes> {
}

export interface FluentApplicationConfig {
  name: string
}

export interface PomApplicationPlugin extends PomegranatePlugin {
  configuration: ApplicationConfiguration
  applicationPlugins: CommonBuilder[]
}

export class ApplicationBuilder extends Builder {
  builder: ApplicationB

  constructor(state: ApplicationPluginTypes | PomApplicationPlugin) {
    super(state)
    this.builder = 'ApplicationBuilder'

  }

  configuration(configuration: FluentApplicationConfig) {
    return this.setState('configuration', configuration)
  }

  applicationPlugins(applicationPlugins: CommonBuilder[]) {
    return this.setState('applicationPlugins', applicationPlugins)
  }

}