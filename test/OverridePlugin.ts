/**
 * @file InjectablePlugin
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project PluginTools
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import { CreatePlugin} from "../src"
describe('Building Override Plugins', () => {
  let Plugin = CreatePlugin('override')
    .configuration({
      name: "Test",
      frameworkPlugin: false,
      depends: [],
      optional: [],
      provides: []
    })
    .variables({})
    .directories([])
    .commands(function herp(){})
    .overrides('Bob')
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

  let Obj = CreatePlugin({
    configuration: {
      name: "Test",
      frameworkPlugin: false,
      depends: [],
      optional: [],
      provides: [],
      type: 'override'
    },
    variables: {},
    directories: [],
    commands: (Derp) => {},
    installs: [],
    overrides: 'Bob',
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
    builder: 'OverrideBuilder', state: {
      configuration:
        {
          name: 'Test',
          frameworkPlugin: false,
          depends: [],
          optional: [],
          provides: [],
          type: 'override'
        },
      variables: {},
      directories: [],
      commands: expect.any(Function),
      overrides: 'Bob',
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
      })
        .configuration({
          name: "Test",
          frameworkPlugin: false,
          depends: [],
          optional: [],
          provides: [],
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
        provides: []
      })
    }).toThrow()
  })

})