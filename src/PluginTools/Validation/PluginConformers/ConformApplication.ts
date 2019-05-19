/**
 * @file ConformApplication
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project PluginTools
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {
  configName,
  configType,
  applicationPlugins
} from '../ValidatorFuns'

export const ConformApplication = {

  configuration: {
    name: configName,
    type: configType,
  },
  applicationPlugins: applicationPlugins
}