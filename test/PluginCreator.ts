/**
 * @file PluginCreator
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project PluginTools
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {CreatePlugin} from "../src/PluginTools/CreatePlugin";

describe('Creating Pomegranate plugins', () => {

  test('Wrong plugin type throws', () => {
    let builderType = 'goof'
    expect(() => {
      // @ts-ignore
      let r = CreatePlugin(builderType)
      console.log(r)
    }).toThrow(new Error(`Unable to find a Pomegranate plugin type with the name ${builderType}
    available types are "action, anything, application, command, composite, factory, instance, loghandler, merge and override"`))
  })

  test('Fluent builder throws if configuration.type is set', () => {
    expect(() => {
      let plugin = CreatePlugin('application')
        //@ts-ignore
        .configuration({type: 'merge', name: 'Bob'})
        .getPlugin()
    }).toThrow(new Error("Cannot set configuration.type when using the fluent plugin builder."))
  })

  test('Fluent builder throws if method is called multiple times', () => {
    expect(() => {
      let plugin = CreatePlugin('application')
        .configuration({name: 'Bob'})
        .configuration({name: 'Bob'})
        .getPlugin()
    }).toThrow(new Error(".configuration() has already been called on this builder."))
  })

  test('Type alone Returns Fluent builder', () => {
    let plugin = CreatePlugin('application')
    let result = plugin
      .configuration({name: 'Bob'})
      .getPlugin()
    // console.log(result)
  })

  test('Creates Application Plugins', () => {
    let plugin = CreatePlugin('application')
    expect(plugin.builder).toEqual('ApplicationBuilder')
  })
});