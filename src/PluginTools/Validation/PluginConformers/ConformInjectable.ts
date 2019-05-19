/**
 * @file merge
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Pomegranate
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
  dashboard,
  applicationMember
} from '../ValidatorFuns'

export const ConformInjectable = {
  variables: variables,
  directories: directories,
  configuration: {
    name: configName,
    type: configType,
    injectableParam: configInjectableParam,
    injectableScope: configInjectableScope,
    frameworkPlugin: configFrameworkPlugin,
    applicationMember: applicationMember,
    depends: configInjectorDeps('depends'),
    provides: configInjectorDeps('provides'),
    optional: configInjectorDeps('optional'),
  },
  hooks: {
    load: hooksRequired('load'),
    start: hooksOptional('start'),
    stop: hooksOptional('stop')
  },
  commands: commands,
  installs: installs,
  dashboard: dashboard
}