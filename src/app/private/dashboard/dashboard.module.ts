import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboarduserComponent } from './pages/dashboarduser/dashboarduser.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CryptoTableComponent } from './components/crypto-table/crypto-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PerfilUserComponent } from './components/perfil-user/perfil-user.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { CompraVentaComponent } from './components/compra-venta/compra-venta.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    DashboarduserComponent,
    CryptoTableComponent,
    PerfilUserComponent,
    CompraVentaComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    FormsModule
  ]
})
export class DashboardModule { }
