import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'public', loadChildren :()=> import ('./public/public.module').then ((m)=>m.PublicModule)
  },
  {
    path: 'private', loadChildren :()=> import ('./private/private.module').then ((m)=>m.PrivateModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
