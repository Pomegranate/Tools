/**
 * @file InjectablePlugin
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project PluginTools
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {EffectPlugin, isEffectBuilder} from "../src"

describe('Building Effect Plugins', () => {
  let Plugin = EffectPlugin()
    .configuration({
      name: "Test",
      frameworkPlugin: false,
      depends: [],
      optional: [],
      provides: [],
      type: 'action'
    })
    .variables({})
    .directories([])
    .commands(() => {

    })
    .installs([])
    .hooks({
      load: () => {
        return {name: 'Test'};
      },
      start: () => {
      },
      stop: () => {
      }
    })

  let Obj = EffectPlugin({
    configuration: {
      name: "Test",
      frameworkPlugin: false,
      depends: [],
      optional: [],
      provides: [],
      type: 'action'
    },
    variables: {},
    directories: [],
    commands: () => {},
    installs: [],
    hooks: {
      load: () => {
        return {name: 'Test'};
      },
      start: () => {
      },
      stop: () => {
      }
    }
  })

  let expectResult = {
    builderType: 'EffectPlugin', state: {
      configuration:
        {
          name: 'Test',
          frameworkPlugin: false,
          depends: [],
          optional: [],
          provides: [],
          type: 'action'
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
        type: 'action'
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
        type: 'action'
      })
    }).toThrow()
  })

  test('isInjectable type checkProp', () => {
    expect(isEffectBuilder(Plugin.getPlugin())).toBeTruthy()
  })

})