import {
  CompleteChannelDef,
  CompleteValueDef,
  CompleteFieldDef,
} from '../types/CompleteChannelDef';
import { Value } from '../types/VegaLite';

export function isCompleteValueDef<Output extends Value = Value>(
  def: CompleteChannelDef<Output>,
): def is CompleteValueDef<Output> {
  return 'value' in def;
}

export function isCompleteFieldDef<Output extends Value = Value>(
  def: CompleteChannelDef<Output>,
): def is CompleteFieldDef<Output> {
  return 'field' in def;
}