import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CryptoService } from 'src/app/private/services/crypto.service';
import { cryptoMonedas } from '../../models/crypto.model';
import {MatDialog} from '@angular/material/dialog';
import { CompraVentaComponent } from '../compra-venta/compra-venta.component';
import { user } from 'src/app/public/login-registro/models/user.interface';
import { UserService } from 'src/app/public/services/user.service';
import { DashboarduserComponent } from '../../pages/dashboarduser/dashboarduser.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-crypto-table',
  templateUrl: './crypto-table.component.html',
  styleUrls: ['./crypto-table.component.scss']
})
export class CryptoTableComponent implements OnInit {
  displayedColumns: string[] = ['asset', 'name', 'value', 'stock','compra/venta'];
  dataSource: MatTableDataSource<cryptoMonedas>;
  user:user = {}as user
  suscription: Subscription = new Subscription;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cryptoservice:CryptoService,public dialog: MatDialog,private userservice:UserService,private dashborad:DashboarduserComponent) { 
    this.dataSource = new MatTableDataSource();
    this.paginator = {} as MatPaginator
    this.sort = {} as MatSort
  }

  ngOnInit(): void {
    this.obtenerUser()
    this.suscription = this.cryptoservice.getRefesh().subscribe(()=>{
      this.refreshTable()
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.refreshTable()   
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
      this.refreshTable()  
    }
  }
  refreshTable(){
    this.cryptoservice.getAllCoins().subscribe(coins =>{
      if(!!coins){
        this.dataSource.data=coins
      }else{

      }
    })
  }
  openDialog(coin:cryptoMonedas,type:string) {
    sessionStorage.setItem('trade',type)
    this.dialog.open(CompraVentaComponent, {
      data: {
        crypto_id:coin.crypto_id,
        crypto_name:coin.crypto_name,
        asset:coin.asset,
        icon:coin.icon,
        stock:coin.stock,
        value:coin.value,
      },disableClose:true},)
  }
  obtenerUser(){
    this.user=this.userservice.getUsuario()
  }
}

