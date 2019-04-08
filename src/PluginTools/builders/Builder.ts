/**
 * @file Builder
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project PluginTools
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {isObject, isString, has, merge} from 'lodash/fp'

export interface CompleteBuilder {}
export interface FluentBuilder {}

export function isFluentBuilder(state: any): state is FluentBuilder {
  return isString(state)
}

export function isCompleteBuilder(state: any): state is CompleteBuilder {
  return (has('configuration.type', state) && isString(state.configuration.type))
}

function createPluginState(state: any) {
  if (isCompleteBuilder(state)) {
    return state
  }
  if (isFluentBuilder(state)) {
    return {
      configuration: {
        type: state
      }
    }
  }
}

export class Builder {
  protected fluent: boolean
  protected builder: any
  protected called: { [key: string]: boolean }
  protected state: any
  constructor(state: any){
    this.fluent = !isObject(state)
    this.called = {}
    this.state = createPluginState(state)
  }

  protected checkProp(prop: string) {

    if(!this.fluent){
      throw new Error('This builder was created with a complete plugin config, fluent methods cannot be called on it.')
    }

    if (this.called[prop]) {
      throw new Error(`.${prop}() has already been called on this builder.`)
    }
    this.called[prop] = true
  }

  protected setState(prop: string, value: any) {
    this.checkProp(prop)
    if(prop === 'configuration'){
      if(value.type){
        throw new Error("Cannot set configuration.type when using the fluent plugin builder.")
      }
      value = merge(this.state.configuration, value)

    }
    this.state[prop] = value
    return this
  }

  getPlugin() {
    return {
      builder: this.builder,
      state: this.state
    }
  }
}