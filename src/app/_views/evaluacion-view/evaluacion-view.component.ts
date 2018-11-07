import {Component, Inject, OnInit} from '@angular/core';
import {EvaluacionService} from '../../_services/evaluacion.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import * as moment from 'moment-timezone';
import {DatosUsuarioService} from '../../_services/datos-usuario.service';
import {element} from 'protractor';

@Component({
  selector: 'app-evaluacion-view',
  templateUrl: './evaluacion-view.component.html',
  styleUrls: ['./evaluacion-view.component.css'],
  providers: [EvaluacionService, DatosUsuarioService]
})
export class EvaluacionViewComponent implements OnInit {

  ValoresSemana;
  ValoresDia;
  ValoresSelected;
  cargaDatos = false;
  datosUsuario;

  // Periodo
  mostrarSemana;
  diaEvaluacion = 'Semana';

  // Gauge Declaraciones
  CaloriasRecomendada;
  CaloriasRequerida;

  // Resultado Valor
  Colores = ['#e44a00', '#f8bd19', '#6baa01', '#f8bd19', '#e44a00'];
  Clasificacion = ['MUY BAJO', 'BAJO', 'BIEN', 'ALTO', 'DEMASIADO'];
  porcMin = [0, 0.15, 0.42, 0.58, 0.85];
  porcMax = [0.15, 0.42, 0.58, 0.85, 1];

  ColorPaletGauge = [
    {
      minValue: 0,
      maxValue: 20,
      code: '#e44a00',
    }, {
      minValue: 20,
      maxValue: 40,
      code: '#f8bd19'
    },
    {
      minValue: 40,
      maxValue: 60,
      code: '#6baa01'
    }, {
      minValue: 60,
      maxValue: 80,
      code: '#f8bd19'
    }, {
      minValue: 80,
      maxValue: 100,
      code: '#e44a00'
    }];


  public InfoCalorias = {
    // Configuracion
    chart: {
      // Titulo
      caption: 'CALORIAS CONSUMIDAS',
      captionFontSize: 20,
      captionFontBold: 1,

      // Subtitulo
      subCaption: '',
      subcaptionFontSize: 32,
      subcaptionFontColor: '',

      // Values
      valueFontSize: 20,
      majorTMNumber: 2,
      lowerLimitDisplay: 'Muy Bajo',
      upperLimitDisplay: 'Demasiado',
      valueBelowPivot: 1,
      showTickMarks: 0,
      showTickValues: 1,
      placeValuesInside: 1,
      lowerLimit: 0,
      upperLimit: 100,
      pivotRadius: 10,

      decimals: 1,
      showValue: 1,
      theme: 'fusion',
      showToolTip: 1,
    },
    // Colores
    colorRange: {
      color: this.ColorPaletGauge
    },
    // Datos
    dials: {
      dial: [{
        value: 0
      }]
    }
  };

  // public InfoValores = {
  //   radarChartLabels:
  //     [],
  //   radarChartData: [{
  //     data:
  //       [],
  //     label: 'Ingerido'
  //   }, {
  //     data:
  //       [],
  //     label: 'Sugerido'
  //   }],
  //   radarChartType: 'radar'
  // };

  public InfoValores = [];

  constructor(private _EvaluacionService: EvaluacionService,
              private _DatosUsuarioService: DatosUsuarioService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    this.datosUsuario = await this._DatosUsuarioService.getDatos().toPromise();
    this.ValoresDia = await this._EvaluacionService.getEvaluacionDia().toPromise();
    this.ValoresSemana = await this._EvaluacionService.getEvaluacionSemana().toPromise();
    this.cargaDatos = true;
    this.mostrarSemana = this.datosUsuario.DefaultEvaluacion;

    console.log(this.ValoresSemana);

    if (this.mostrarSemana) {
      this.graficoCalorias(this.ValoresSemana);
      this.graficoValores(this.ValoresSemana);

    } else {
      for (let i = 0; i < this.ValoresDia.length; i++) {
        const diaA = moment(this.ValoresDia[i].FechaInicio).format('MM DD YYYY');
        const diaB = moment().subtract(1, 'days').format('MM DD YYYY');
        if (diaA === diaB) {
          moment.locale('es');
          this.diaEvaluacion = moment().subtract(1, 'days').format('dddd D/MM');
          this.diaEvaluacion = this.diaEvaluacion[0].toUpperCase() + this.diaEvaluacion.substr(1).toLowerCase();
          this.graficoCalorias(this.ValoresDia[i]);
          this.graficoValores(this.ValoresDia[i]);
        }
      }
    }
  }

  graficoCalorias(Periodo) {
    // Definiciones
    let i = 0, ubicacion = 0;
    this.ValoresSelected = Periodo;
    const calorias = Periodo.Valores.find(x => x.ValorNutricional.Nombre === 'Calorias');

    // Calorias requeridas SIN COLACION (CAMBIAR)
    const CaloriasRequerida = Math.round((calorias.CantidadRequerida * 100) / 100) * 0.86;
    this.CaloriasRequerida = CaloriasRequerida;
    this.CaloriasRecomendada = calorias.CantidadConsumida;

    this.InfoCalorias.chart.upperLimit = CaloriasRequerida * 2;
    this.InfoCalorias.colorRange.color.forEach(elem => {
      elem.minValue = ((CaloriasRequerida * 2) * this.porcMin[i]);
      elem.maxValue = ((CaloriasRequerida * 2) * this.porcMax[i]);
      if (elem.minValue < calorias.CantidadConsumida && elem.maxValue > calorias.CantidadConsumida) {
        ubicacion = i;
      }
      i++;
    });
    this.InfoCalorias.dials.dial.forEach(x => x.value = calorias.CantidadConsumida);
    this.InfoCalorias.chart.subCaption = this.Clasificacion[ubicacion];
    this.InfoCalorias.chart.subcaptionFontColor = this.Colores[ubicacion];
  }

  graficoValores(Periodo) {
    this.ValoresSelected = Periodo;

    // for (let i = 0; i < Periodo.Valores.length; i++) {
    //   const elemento = Periodo.Valores[i];
    //   if (elemento.ValorNutricional.Nombre !== 'Calorias') {
    //     this.InfoValores.radarChartLabels.push(elemento.ValorNutricional.Nombre);
    //     this.InfoValores.radarChartData.map(x => {
    //       if (x.label === 'Ingerido') {
    //         x.data.push(elemento.CantidadConsumida);
    //       } else {
    //         x.data.push(elemento.CantidadRequerida);
    //       }
    //     });
    //   }
    // }
    Periodo.Valores.forEach(elemento => {
      if (elemento.ValorNutricional.Nombre !== 'Calorias') {
        for (let i = 0; i < 5; i++) {
          const minValue = ((elemento.CantidadRequerida * 2) * this.porcMin[i]);
          const maxValue = ((elemento.CantidadRequerida * 2) * this.porcMax[i]);
          if (minValue < elemento.CantidadConsumida && maxValue > elemento.CantidadConsumida) {
            elemento.Resultado = this.Clasificacion[i];
            elemento.ColorResultado = this.Colores[i];
          }
        }
        this.InfoValores.push(elemento);
      }
      console.log(this.InfoValores);
    });
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  switchSemana() {
    this.mostrarSemana = !this.mostrarSemana;
    if (!this.mostrarSemana) {
      const dialogRef = this.dialog.open(EvaluacionSwitchComponent, {
        width: '80%'
      });
      dialogRef.afterClosed().subscribe(res => {
        if (res !== undefined) {
          this.diaEvaluacion = res;
          for (let i = 0; i < this.ValoresDia.length; i++) {
            let dia = moment(this.ValoresDia[i].FechaInicio).format('dddd D/MM');
            dia = dia[0].toUpperCase() + dia.substr(1).toLowerCase();
            if (dia === res) {
              this.graficoCalorias(this.ValoresDia[i]);
            }
          }
        } else {
          this.mostrarSemana = !this.mostrarSemana;
        }
      });
      dialogRef.backdropClick().subscribe(x => {
        this.mostrarSemana = !this.mostrarSemana;
      });
    } else {
      this.diaEvaluacion = 'Semana';
      this.graficoCalorias(this.ValoresSemana);
    }
  }

  historial() {
    const dialogRef = this.dialog.open(EvaluacionHistorialComponent, {
      width: '80%'
    });
    dialogRef.afterClosed().subscribe(res => {
    });

  }

  configuracion() {
    const dialogRef = this.dialog.open(EvaluacionConfigComponent, {
      width: '80%',
      data: this.datosUsuario
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res !== undefined) {
        this._EvaluacionService.configuracionUsuario(res).subscribe(respo => {
          this.openSnackBar('Guardado con Exito', 'Descartar');
        });
      }
    });
  }
}

@Component({
  selector: 'app-evaluacion-view-switch',
  templateUrl: './evaluacion-view-switch.component.html',
  styleUrls: ['./evaluacion-view.component.css'],
})
export class EvaluacionSwitchComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<EvaluacionSwitchComponent>) {
  }

  DiasSemana = [];
  Selected;

  confirmar(dia) {
    this.dialogRef.close(dia);
  }

  cancelar() {
    this.dialogRef.close();
  }

  ngOnInit() {
    moment.locale('es');
    for (let i = 1; i < 8; i++) {
      let dia = moment().tz('America/Argentina/Cordoba').subtract(i, 'days').format('dddd D/MM');
      dia = dia[0].toUpperCase() + dia.substr(1).toLowerCase();
      this.DiasSemana.push(dia);
    }
  }

}

@Component({
  selector: 'app-evaluacion-view-configuracion',
  templateUrl: './evaluacion-view-configuracion.component.html',
  styleUrls: ['./evaluacion-view.component.css']
})
export class EvaluacionConfigComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<EvaluacionConfigComponent>) {
  }

  DiasSemana = [
    {value: 'Monday', dia: 'Lunes'},
    {value: 'Tuesday', dia: 'Martes'},
    {value: 'Wednesday', dia: 'Miercoles'},
    {value: 'Thursday', dia: 'Jueves'},
    {value: 'Friday', dia: 'Viernes'},
    {value: 'Saturday', dia: 'Sabado'},
    {value: 'Sunday', dia: 'Domgino'},

  ];
  Selected = {
    dia: null,
    config: null
  };
  defaultConfig = [
    {value: true, titulo: 'Semana'},
    {value: false, titulo: 'Dia'}];

  confirmar(datos) {
    this.dialogRef.close(datos);
  }

  cancelar() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-evaluacion-view-historial',
  templateUrl: './evaluacion-view-historial.component.html',
  styleUrls: ['./evaluacion-view.component.css'],
})
export class EvaluacionHistorialComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<EvaluacionHistorialComponent>) {
  }

  confirmar() {
    this.dialogRef.close();
  }

  cancelar() {
    this.dialogRef.close();
  }

}
