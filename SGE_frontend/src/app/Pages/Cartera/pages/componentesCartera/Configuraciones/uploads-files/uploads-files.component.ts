import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadFilesService } from 'src/app/Services/Cartera/files/upload-files.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-uploads-files',
  templateUrl: './uploads-files.component.html',
  styleUrls: ['./uploads-files.component.css']
})
export class UploadsFilesComponent implements OnInit {

  files: any = {
    delimitante: "",
    multipartFile: ""
  }

  delimitante: string = ''

  constructor(private sanitizer: DomSanitizer, private uploadsFiles: UploadFilesService) { }

  ngOnInit(): void {
  }

  obtenerArchivo(event: any) {
    var archivo = event.target.files[0];

    if (archivo.size > 10000048576) {
      Swal.fire('Error', 'El Archivo Es Demasiado Pesado', 'error')
      this.files.multipartFile = ''
      return
    }

    this.extraerBase64(archivo).then((file: any) => {
      this.files.multipartFile = file.base;

    })


  }


  public extraerBase64 = async ($event: any) => new Promise((resolve, reject): any => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })


  subirFile() {
    this.uploadsFiles.subirGestiones(this.files).subscribe(
      (data:any)=>{
        
      },(error:any)=>{
        console.log(error);
        
      }
    )
  }

}
