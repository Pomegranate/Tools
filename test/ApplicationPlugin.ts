/**
 * @file ApplicationPlugin
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project PluginTools
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {ApplicationPlugin, isApplicationBuilder} from "../src"

describe('Building Injectable Plugins', () => {
  let Fluent = ApplicationPlugin()
    .configuration({
      name: 'Test',
      type: 'application'
    })
    .applicationPlugins([])

  let Obj = ApplicationPlugin({
    configuration: {
      name: 'Test',
      type: 'application'
    },
    applicationPlugins: []
  })

  let expectResult ={
    builderType: 'ApplicationPlugin', state: {
      configuration:
        {
          name: 'Test',
          type: 'application'
        },
      applicationPlugins: []
    }
  }

  test('Fluent interface', () => {
    console.log(Fluent.getPlugin())
    expect(Fluent.getPlugin()).toEqual(expect.objectContaining(expectResult))
  })

  test('Obj interface', () => {
    expect(Obj.getPlugin()).toEqual(expect.objectContaining(expectResult))
  })

  test('Single call methods', () => {
    expect(() => {
      Fluent.configuration({
        name: 'Test',
        type: 'application'
      })
    }).toThrow()
  })

  test('No Fluent methods on Obj interface', () => {
    expect(() => {
      Obj.configuration({
        name: 'Test',
        type: 'application'
      })
    }).toThrow()
  })
  test('isApplication type checkProp', () => {
    expect(isApplicationBuilder(Fluent.getPlugin())).toBeTruthy()
  })
});