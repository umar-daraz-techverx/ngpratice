import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-imae',
  templateUrl: './upload-imae.component.html',
  styleUrls: ['./upload-imae.component.css']
})
export class UploadImaeComponent {

  fileupload: File = null
  url:string
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit() {
  }
  handlefile(file: FileList) {

  this.fileupload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.url = event.target.result;
    }
    reader.readAsDataURL(this.fileupload);
  }
  onSubmit(Caption, Image) {

    console.log(Caption.value)
    console.log(this.fileupload.name)
   const endpoint = this.baseUrl+"api/Employee/PostImage";
   const formData: FormData = new FormData();
   formData.append('Image', this.fileupload, this.fileupload.name);
   formData.append('ImageCaption', Caption.value);
    return this.http.post(endpoint, formData).subscribe(result => {
      console.log(result);
    }, error => console.error(error));
  }
}
