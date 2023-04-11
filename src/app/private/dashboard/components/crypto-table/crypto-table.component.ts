import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CryptoService } from 'src/app/private/services/crypto.service';
import { cryptoMonedas } from '../../models/crypto.model';
import {MatDialog} from '@angular/material/dialog';
import { CompraVentaComponent } from '../compra-venta/compra-venta.component';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-crypto-table',
  templateUrl: './crypto-table.component.html',
  styleUrls: ['./crypto-table.component.scss']
})
export class CryptoTableComponent implements OnInit {
  displayedColumns: string[] = ['asset', 'name', 'value', 'stock','compra/venta'];
  dataSource: MatTableDataSource<cryptoMonedas>;
  cryptoCoins:cryptoMonedas[]=[]
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cryptoservice:CryptoService,public dialog: MatDialog) { 
    this.dataSource = new MatTableDataSource();
    this.cryptoservice.getAllCoins().subscribe(coins =>{
      if(!!coins){
        this.cryptoCoins=coins
        this.refreshTable(this.cryptoCoins)
      }else{

      }
    })
    this.paginator = {} as MatPaginator
    this.sort = {} as MatSort        // Assign the data to the data source for the table to render

  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  refreshTable(coins:cryptoMonedas[]){
    this.dataSource.data=coins
  }
  openDialog(coin:cryptoMonedas) {
    this.dialog.open(CompraVentaComponent, {
      data: {
        crypto_id:coin.crypto_id,
        crypto_name:coin.crypto_name,
        asset:coin.asset,
        icon:coin.icon,
        stock:coin.stock,
        value:coin.value,
      },
    });
  }
}

