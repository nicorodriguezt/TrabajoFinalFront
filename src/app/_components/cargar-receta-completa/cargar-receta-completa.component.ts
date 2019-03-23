import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecetaService} from '../../_services/receta.service';

@Component({
  selector: 'app-cargar-receta-completa',
  templateUrl: './cargar-receta-completa.component.html',
  styleUrls: ['./cargar-receta-completa.component.css'],
  providers: [RecetaService]
})
export class CargarRecetaCompletaComponent implements OnInit {
  @Input() Receta;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  _pasosForm: FormGroup;

  _Auxiliar;
  _Momentos = [];
  _Cargando = true;
  panelOpenState = false;

  constructor(private _formBuilder: FormBuilder,
              private _RecetaService: RecetaService) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });

    this._pasosForm = this._formBuilder.group({
      pasos: this._formBuilder.array([this.addPasosGroup()])
    });

    this._RecetaService.getMomentos().subscribe(res => {
      this._Auxiliar = res;
      this._Auxiliar.forEach(x => {
        this._Momentos.push(x);
      });
      this._Cargando = false;
    });
  }

  addPasosGroup() {
    return this._formBuilder.group({
      valor: []
    });
  }

  addPaso() {
    this.pasosArray.push(this.addPasosGroup());
  }

  get pasosArray() {
    return <FormArray>this._pasosForm.get('pasos');
  }




}
