/**
 * @file index
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project plugin-facade
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */


'use strict';

import {joinWithBase} from "./joinWithBase";
import {relativeOutputFile} from "./relativeOutputFile";
import {relativeFileExists} from "./relativeFileExists";
import {fileBaseName} from "./fileBaseName";
import {fileListFromPath} from './fileList'
import {FileListDeepFromPath} from "./fileListDeep";
import {fileListNestedFromPath} from "./fileListNested";
import {WalkWorkDirPath} from "./walkWorkDir";
import {WalkReducePath} from './walkReduce'

/**
 *
 * @module index
 */

export type PluginFiles = (prop: string) => PluginFilesMethods
export interface PluginFilesMethods {
  baseName
  joinWithBase
  relativeOutputFile
  relativeFileExists
  workingDirectory
  projectDirectory
  outputProjectFile
  projectFileExists
  fileBaseName
  fileList
  fileListDeep
  fileListNested
  walkWorkDir
  walkReduce
  ctors: {
    fileList,
    fileListDeep,
    fileListNested,
    walkWorkDir ,
    walkReduce
  }
}

export const PluginFileHandler = (wd: string, pd?: string): PluginFilesMethods => {
  return {
    baseName: fileBaseName(wd),
    joinWithBase: joinWithBase(wd),
    relativeOutputFile: relativeOutputFile(wd),
    relativeFileExists: relativeFileExists(wd),
    workingDirectory: wd,
    projectDirectory: pd,
    outputProjectFile: pd  && relativeOutputFile(pd),
    projectFileExists: pd && relativeFileExists(pd),
    fileBaseName: fileBaseName,
    fileList: fileListFromPath(wd),
    fileListDeep: FileListDeepFromPath(wd),
    fileListNested: fileListNestedFromPath(wd),
    walkWorkDir: WalkWorkDirPath(wd),
    walkReduce: WalkReducePath(wd),
    ctors: {
      fileList: fileListFromPath,
      fileListDeep: FileListDeepFromPath,
      fileListNested: fileListNestedFromPath,
      walkWorkDir: WalkWorkDirPath,
      walkReduce: WalkReducePath,
    }
  }
}