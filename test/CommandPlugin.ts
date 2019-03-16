/**
 * @file InjectablePlugin
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project PluginTools
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {CommandPlugin, isCommandBuilder} from "../src"

describe('Building Injectable Plugins', () => {
  let Plugin = CommandPlugin<any>()
    .configuration({
      name: "Test",
      frameworkPlugin: false,
      type: 'command'
    })
    .variables({})
    .directories([])
    .commands(() => {

    })
    .installs([])

  let Obj = CommandPlugin({
    configuration: {
      name: "Test",
      frameworkPlugin: false,
      type: 'command'
    },
    variables: {},
    directories: [],
    commands: () => {},
    installs: [],
  })

  let expectResult = {
    builderType: 'CommandPlugin', state: {
      configuration:
        {
          name: 'Test',
          frameworkPlugin: false,
          type: 'command'
        },
      variables: {},
      directories: [],
      commands: expect.any(Function),
      installs: []
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
        type: 'command'
      })
    }).toThrow()
  })

  test('No Fluent methods on Obj interface', () => {
    expect(() => {
      Obj.configuration({
        name: "Test",
        frameworkPlugin: false,
        type: 'command'
      })
    }).toThrow()
  })

  test('isInjectable type checkProp', () => {
    expect(isCommandBuilder(Plugin.getPlugin())).toBeTruthy()
  })

})