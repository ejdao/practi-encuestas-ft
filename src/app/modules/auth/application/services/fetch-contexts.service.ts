import { CtmType } from '@common/types';

export abstract class FetchContextsService {
  abstract execute(): Promise<CtmType<string>[]>;
}
