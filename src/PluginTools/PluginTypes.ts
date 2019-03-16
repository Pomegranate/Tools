/**
 * @file PluginTypes
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project PluginTools
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

export type InjectableParameter = any

export interface PomegranatePluginConfig {
  name: string,
  type: string
}

export interface PomegranatePlugin {
  configuration: PomegranatePluginConfig
}


export interface GeneratedPlugin {
  builderType: string,
  state: any
}


export interface CommonConfiguration<TPluginType> {
  name: string
  type: TPluginType
  frameworkPlugin?: boolean
}

export interface CommonBuilder {
  getPlugin: () => GeneratedPlugin
}

export interface PluginDirectory {
  prop: string,
  path: string
}

export interface PluginDirectories {
  [index: number]: string | PluginDirectory
}

export function isPluginDirectory(pluginDirectory: string | PluginDirectory): pluginDirectory is PluginDirectory {
  return ((<PluginDirectory>pluginDirectory).path !== undefined && (<PluginDirectory>pluginDirectory).prop !== undefined)
}

export interface LogMessage {
  severity: string,
  verbocity: number,
  messages: any[]
}

export type PomLogger = 'pomegranate'
export type SystemLogger = 'system'

export interface LoggerData {
  source: PomLogger | SystemLogger | string
  appendSource?: boolean
  logLevel?: number
  logFormat?: {
    log?: string[]
    warn?: string[]
    info?: string[]
    error?: string[]
  }
}

export interface CommonHooks {
  load?(...injectable: InjectableParameter[]): Promise<any> | any
  start?(...injectable: InjectableParameter[]): Promise<any> | any
  stop?(...injectable: InjectableParameter[]): Promise<any> | any
}


export interface LogHandler {
  (logMessage: LogMessage, loggerData: LoggerData): void
}

export interface PluginVariables {
  [key: string]: any
}

export interface PluginCommands {
  (): any
}






