/**
 * @file InjectablePlugin
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project PluginTools
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {InjectablePlugin, isInjectableBuilder} from "../src"

describe('Building Injectable Plugins', () => {
  let Plugin = InjectablePlugin<any>()
    .configuration({
      name: "Test",
      frameworkPlugin: false,
      injectableParam: "Test",
      depends: [],
      optional: [],
      provides: [],
      type: 'anything'
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

  let Obj = InjectablePlugin({
    configuration: {
      name: "Test",
      frameworkPlugin: false,
      injectableParam: "Test",
      depends: [],
      optional: [],
      provides: [],
      type: 'anything'
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
    builderType: 'InjectablePlugin', state: {
      configuration:
        {
          name: 'Test',
          frameworkPlugin: false,
          injectableParam: 'Test',
          depends: [],
          optional: [],
          provides: [],
          type: 'anything'
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
        injectableParam: "Test",
        depends: [],
        optional: [],
        provides: [],
        type: 'anything'
      })
    }).toThrow()
  })

  test('No Fluent methods on Obj interface', () => {
    expect(() => {
      Obj.configuration({
        name: "Test",
        frameworkPlugin: false,
        injectableParam: "Test",
        depends: [],
        optional: [],
        provides: [],
        type: 'anything'
      })
    }).toThrow()
  })

  test('isInjectable type checkProp', () => {
    expect(isInjectableBuilder(Plugin.getPlugin())).toBeTruthy()
  })

})