import { BaseOutput } from './base-output';
import { CantonOutput } from './canton-output';
export interface ProvinceOutput extends BaseOutput{
  name: string;
  cantons?: CantonOutput[];
}