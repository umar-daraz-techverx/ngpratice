import { Component, OnInit, OnDestroy, ViewChild, Inject} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {Product} from '../product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit, OnDestroy {
  id: number;
  private sub: any;
 product:Product;
 
  constructor(private router:Router,private route: ActivatedRoute,private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
       // In a real app: dispatch action to load the details here.
    });
    this.getProduct()
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getProduct()
  {
      this.http.get<Product>(this.baseUrl + 'api/Employee/GetProductById/?id='+this.id).subscribe(result => {
        this.product = result;
      }, error => console.error(error));
     //this.product=this.productlist.filter(x=>x.Id==this.id)[0]
  }
 //DeleteProduct
 DeleteProduct()
 {
  if(confirm("Are you want to Delte..?"))
  {
   let search = new URLSearchParams();
  this.http.delete<Product>(this.baseUrl + 'api/Employee/DeleteProduct/?id='+this.id).subscribe(res => {console.log(res)}
  ,error =>{ 
    console.error(error);
    this.router.navigateByUrl('/product');
  });
}
 }
 

}
