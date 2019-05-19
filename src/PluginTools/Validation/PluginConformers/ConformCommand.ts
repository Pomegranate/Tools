/**
 * @file ConformCommand
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project PluginTools
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {
  variables,
  installs,
  directories,
  configName,
  configType,
  configInjectableParam,
  configInjectableScope,
  configFrameworkPlugin,
  configInjectorDeps,
  hooksRequired,
  hooksOptional,
  commands,
  dashboard
} from '../ValidatorFuns'

export const ConformCommand = {
  variables: variables,
  directories: directories,
  configuration: {
    name: configName,
    type: configType,
    frameworkPlugin: configFrameworkPlugin,
  },
  commands: commands,
  installs: installs,
  dashboard: dashboard
}