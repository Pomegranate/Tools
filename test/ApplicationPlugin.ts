/**
 * @file ApplicationPlugin
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project PluginTools
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {CreatePlugin} from "../src"

describe('Building Application Plugins', () => {

  let Plugin = CreatePlugin('application')
    .configuration({
      name: 'Test'
    })
    .applicationPlugins([])

  let Obj = CreatePlugin({
    configuration: {
      name: 'Test',
      type: 'application'
    },
    applicationPlugins: []
  })

  let expectResult ={
    builder: 'ApplicationBuilder', state: {
      configuration:
        {
          name: 'Test',
          type: 'application'
        },
      applicationPlugins: []
    }
  }

  test('Plugin interface', async () => {
    expect(await Plugin.getPlugin()).toEqual(expect.objectContaining(expectResult))
  })

  test('Obj interface',async  () => {
    expect(await Obj.getPlugin()).toEqual(expect.objectContaining(expectResult))
  })

  test('Setting configuration.type throws on Plugin builder', () => {
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

  test('No Plugin methods on Obj interface', () => {
    expect(() => {
      Obj.configuration({
        name: 'Test'
      })
    }).toThrow(new Error('This builder was created with a complete plugin config, fluent methods cannot be called on it.'))
  })
});