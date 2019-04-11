/**
 * @file index
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project plugin-facade
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */


'use strict';
import {join} from 'path'
import {joinWithBase, manualJoinWithBase} from "./joinWithBase";
import {relativeOutputFile} from "./relativeOutputFile";
import {relativeFileExists, manualRelativeFileExists} from "./relativeFileExists";
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
  join
  joinWithBase
  relativeOutputFile
  relativeFileExists
  workingDirectory
  projectDirectory
  outputProjectFile
  projectFileExists
  joinWithProject
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
    join: join,
    joinWithBase: manualJoinWithBase(wd),
    relativeOutputFile: relativeOutputFile(wd),
    relativeFileExists: manualRelativeFileExists(wd),
    workingDirectory: wd,
    projectDirectory: pd,
    outputProjectFile: pd  && relativeOutputFile(pd),
    projectFileExists: pd && manualRelativeFileExists(pd),
    joinWithProject: pd && manualJoinWithBase(pd),
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