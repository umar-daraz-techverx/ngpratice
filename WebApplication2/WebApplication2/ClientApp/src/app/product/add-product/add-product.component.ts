import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../product';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  fileupload: File = null
  url: string = 'assets/img/samsung.jpg'
  product: Product;
  constructor(private route: Router,private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}

  ngOnInit() {
    this.product = new Product();
  }
  handlefile(file: FileList) {
    this.fileupload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.url = event.target.result;
    }
    reader.readAsDataURL(this.fileupload);
  }
  save() 
  {
    const endpoint = this.baseUrl + "api/Employee/PostImage";
    const formData: FormData = new FormData();
    formData.append('Image', this.fileupload, this.fileupload.name);
    formData.append('Discraption', this.product.Discraption);
    formData.append('Title', this.product.Title);
    return this.http.post(endpoint, formData).subscribe(result => {
      console.log(result);
      this.route.navigateByUrl('/product');
    },
     error => {console.error(error);
      this.route.navigateByUrl('/product');});
  }
}
