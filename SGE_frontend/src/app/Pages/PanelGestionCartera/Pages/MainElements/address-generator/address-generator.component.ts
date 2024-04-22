import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BuscarClientesService } from 'src/app/Services/clientes/BuscarClientes/buscar-clientes.service';

@Component({
  selector: 'app-address-generator',
  templateUrl: './address-generator.component.html',
  styleUrls: ['./address-generator.component.css']
})
export class AddressGeneratorComponent implements OnInit {
  estratoArray: number[] = []
  tipoViaArray: string[] = []
  sentidoArray: string[] = []
  alphabet: string[] = []

  departamentos: any[] = []
  ciudades: any[] = []
  idDep: number = 0
  addressFormat: string = ''

  address: any = {
    departamento: '',
    ciudad: '',
    municipio: '',
    barrio: '',
    tipoVia: '',
    sentido1: '',
    sentido2: '',
    numero1: '',
    numero2: '',
    numero3: '',
    letra1: '',
    letra2: '',
    letra3: '',
    letra4: '',
  }

  constructor(private buscarClientes: BuscarClientesService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.getDeps()
    this.getLetters()

    this.estratoArray = [
      1, 2, 3, 4, 5, 6
    ]

    this.tipoViaArray = [
      'Avenida calle',
      'Calle',
      'Carrera',
      'Circular',
      'Circunvalar',
      'Diagonal',
      'Transversal'
    ]


    this.sentidoArray = [
      'Este',
      'Norte',
      'Oeste',
      'Sur'
    ]
  }

  @ViewChild('depart')
  mySelect!: ElementRef<HTMLSelectElement>;

  getCiudadByDep() {
    if (this.idDep > 0) {
      this.renderer.removeAttribute(this.mySelect.nativeElement, 'disabled');
    } else {
      this.renderer.setAttribute(this.mySelect.nativeElement, 'disabled', 'true');
    }
    this.buscarClientes.listarCiudadByDepartamento(this.idDep).subscribe(
      (data: any) => {
        this.ciudades = data
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  getDeps() {
    this.buscarClientes.listarDepartamentos().subscribe(
      (data: any) => {
        this.departamentos = data
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  getLetters() {
    for (let letra = 'a'.charCodeAt(0); letra <= 'z'.charCodeAt(0); letra++) {
      if (String.fromCharCode(letra) !== 'ñ') {
        this.alphabet.push(String.fromCharCode(letra).toUpperCase());
      }
    }
  }

  changeCiudad(event: any) {
    var dep = this.departamentos.find((c: any) => c.id == this.idDep)
    this.address.departamento = dep.name
    this.address.ciudad = ', ' + event.target.value
  }

  changeBarrio(event: any) {
    this.address.barrio = ', ' + event.target.value
  }

  changeTipoVia(event: any) {
    this.address.tipoVia = ', ' + event.target.value
  }

  changeNum2(event: any) {
    this.address.numero2 = ' # ' + event.target.value
  }

  changeNum3(event: any) {
    this.address.numero3 = '-' + event.target.value
  }

  changeLetra3(event: any) {
    this.address.letra3 = ' ' + event.target.value
  }

}