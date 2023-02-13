import { DialogComponent } from './../dialog/dialog.component';
import { ApiService } from './../service/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
@Component({
  selector: 'app-producttable',
  templateUrl: './producttable.component.html',
  styleUrls: ['./producttable.component.scss']
})
export class ProducttableComponent {

  displayedColumns: any[] = ['productName','category','date','freshness','price','comment','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

constructor(private dialog : MatDialog, private api : ApiService){

}
ngOnInit(): void{
  this.getAllProducts();
};

getAllProducts(){
  this.api.getProduct()
  .subscribe({
    next:(res)=>{
      this.dataSource = new MatTableDataSource(res);
    },
    error:(err)=>{
      alert("Error while fetching data")
    }
   })
}
editProduct(row : any){
  this.dialog.open(DialogComponent,{
    width:'30%',
    data:row

  }).afterClosed().subscribe(val=>{
    if(val==='update'){
      this.getAllProducts();
    }
  }

  )
}
  deleteProduct(id:number){
    this.api.deleteProduct(id)
    .subscribe({
      next:(res)=>{
        alert("Product Deleted successfully");
        this.getAllProducts();

      },
      error:()=>{
        alert("Error while deleting the product!!")
      }
    })
  }



}












