import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { PrivateRoutingModule } from './private-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    PrivateRoutingModule
  ]
})
export class PrivateModule { }
