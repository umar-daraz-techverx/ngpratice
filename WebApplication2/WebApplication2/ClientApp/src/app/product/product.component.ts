import { Component, OnInit, Inject } from '@angular/core';
import {Product} from './product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productlist:Product[]
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Product[]>(baseUrl + 'api/Employee/GetProduct').subscribe(result => {
      this.productlist = result;
      console.log("res"+this.productlist);
    }, error => console.error(error));
  }
//GetProduct
  ngOnInit() {
    
  }

}

