/**
 * @file index
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project PluginTools
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {ConformInjectable} from "./PluginConformers/ConformInjectable";
import {ConformAction} from "./PluginConformers/ConformAction";
import {ConformApplication} from "./PluginConformers/ConformApplication";
import {ConformCommand} from "./PluginConformers/ConformCommand";
import {ConformComposite} from "./PluginConformers/ConformComposite";
import {ConformLoghandler} from "./PluginConformers/ConformLoghandler";
import {ConformOverride} from "./PluginConformers/ConformOverride";
import {conformDeep, transformKeys} from "lodash-fun";

export const InjectableValidator = transformKeys(ConformInjectable)
export const ActionValidator = conformDeep(ConformAction)
export const ApplicationValidator = conformDeep(ConformApplication)
export const CommandValidator = conformDeep(ConformCommand)
export const CompositeValidator = conformDeep(ConformComposite)
export const LoghandlerValidator = conformDeep(ConformLoghandler)
export const OverrideValidator = conformDeep(ConformOverride)