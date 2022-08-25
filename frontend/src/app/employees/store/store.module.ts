import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducer } from './employee.reducer';
import { featureKey } from './employee.state';
import { EmployeeEffects } from './employee.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature([EmployeeEffects]),
  ],
})
export class BookStoreModule {}
