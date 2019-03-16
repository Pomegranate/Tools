/**
 * @file InjectablePlugin
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project PluginTools
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {isLoghandlerBuilder, LoghandlerPlugin} from "../src"

describe('Building Loghandler Plugins', () => {
  let Plugin = LoghandlerPlugin()
    .configuration({
      name: "Test",
      frameworkPlugin: false,
      depends: [],
      optional: [],
      provides: [],
      type: 'loghandler'
    })
    .variables({})
    .directories([])
    .commands(() => {

    })
    .installs([])
    .hooks({
      load: () => {
        return (a,b) => {

        }
      },
      start: () => {
      },
      stop: () => {
      }
    })

  let Obj = LoghandlerPlugin({
    configuration: {
      name: "Test",
      frameworkPlugin: false,
      depends: [],
      optional: [],
      provides: [],
      type: 'loghandler'
    },
    variables: {},
    directories: [],
    commands: () => {},
    installs: [],
    hooks: {
      load: () => {
        return () => {

        }
      },
      start: () => {
      },
      stop: () => {
      }
    }
  })

  let expectResult = {
    builderType: 'LoghandlerPlugin', state: {
      configuration:
        {
          name: 'Test',
          frameworkPlugin: false,
          depends: [],
          optional: [],
          provides: [],
          type: 'loghandler'
        },
      variables: {},
      directories: [],
      commands: expect.any(Function),
      installs: [],
      hooks:
        {
          load: expect.any(Function),
          start: expect.any(Function),
          stop: expect.any(Function)
        }
    }
  }

  test('Fluent interface', () => {
    expect(Plugin.getPlugin()).toEqual(expect.objectContaining(expectResult))
  })

  test('Obj interface', () => {
    expect(Obj.getPlugin()).toEqual(expect.objectContaining(expectResult))
  })
  test('Single call methods', () => {
    expect(() => {
      Plugin.configuration({
        name: "Test",
        frameworkPlugin: false,
        depends: [],
        optional: [],
        provides: [],
        type: 'loghandler'
      })
    }).toThrow()
  })

  test('No Fluent methods on Obj interface', () => {
    expect(() => {
      Obj.configuration({
        name: "Test",
        frameworkPlugin: false,
        depends: [],
        optional: [],
        provides: [],
        type: 'loghandler'
      })
    }).toThrow()
  })

  test('isStructural type checkProp', () => {
    expect(isLoghandlerBuilder(Plugin.getPlugin())).toBeTruthy()
  })
})
;