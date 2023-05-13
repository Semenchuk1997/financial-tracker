import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

export interface ExternalProvider<T> {
  imports?: ModuleMetadata['imports'];
  inject?: FactoryProvider<T>['inject'];
  useFactory: FactoryProvider<T>['useFactory'];
}
