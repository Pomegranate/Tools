/**
 * @file InjectablePlugin
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project PluginTools
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {CreatePlugin} from "../src"

describe('Building Loghandler Plugins', () => {
  let Plugin = CreatePlugin('loghandler')
    .configuration({
      name: "Test",
      frameworkPlugin: false,
      depends: [],
      optional: [],
      provides: []
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

  let Obj = CreatePlugin({
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
    builder: 'LoghandlerBuilder', state: {
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

  test('Setting configuration.type throws on Fluent builder', () => {
    expect(() => {
      let P = CreatePlugin('application')
        .configuration({
          name: 'Test',
          //@ts-ignore
          type: 'application'
        })
    }).toThrow(new Error('Cannot set configuration.type when using the fluent plugin builder.'))
  })

  test('Single call methods', () => {
    expect(() => {
      Plugin
        .configuration({
          name: 'Test',
        })
        .configuration({
          name: 'Test',
        })
    }).toThrow(new Error('.configuration() has already been called on this builder.'))
  })

  test('No Fluent methods on Obj interface', () => {
    expect(() => {
      Obj.configuration({
        name: 'Test'
      })
    }).toThrow(new Error('This builder was created with a complete plugin config, fluent methods cannot be called on it.'))
  })

})
;