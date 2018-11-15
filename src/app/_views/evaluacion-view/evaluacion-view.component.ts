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
  Historial;
  cargaDatos = false;
  enableHistorial = false;
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
      color: [
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
        }]
    },
    // Datos
    dials: {
      dial: [{
        value: 0
      }]
    }
  };

  public InfoValores = [];

  GaugeLinearConf = {
    chart: {
      theme: 'fusion',
      lowerLimit: 0,
      upperLimit: 100,
      numberSuffix: '',
      chartBottomMargin: 20,
      valueFontSize: 11,
      valueFontBold: 0,
      majorTMNumber: 3
    },
    colorRange: {
      color: [
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
        }]
    },
    pointers: {
      pointer: [{
        value: 0
      }]
    },
    trendPoints: {
      point: [{
        startValue: 50,
        displayValue: ' ',
        dashed: 1,
        showValues: 0
      }]
    }
  };

  constructor(private _EvaluacionService: EvaluacionService,
              private _DatosUsuarioService: DatosUsuarioService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    this.datosUsuario = await this._DatosUsuarioService.getDatos().toPromise();
    this.ValoresDia = await this._EvaluacionService.getEvaluacionDia().toPromise();
    this.ValoresSemana = await this._EvaluacionService.getEvaluacionSemana().toPromise();
    this.Historial = await this._EvaluacionService.historial().toPromise();
    this.mostrarSemana = this.datosUsuario.DefaultEvaluacion;
    this.cargaDatos = true;

    console.log(this.Historial);

    if (this.mostrarSemana) {
      await this.graficoCalorias(this.ValoresSemana);
      await this.graficoValores(this.ValoresSemana);

    } else {
      for (let i = 0; i < this.ValoresDia.length; i++) {
        const diaA = moment(this.ValoresDia[i].FechaInicio).format('MM DD YYYY');
        const diaB = moment().subtract(1, 'days').format('MM DD YYYY');
        if (diaA === diaB) {
          moment.locale('es');
          this.diaEvaluacion = moment().subtract(1, 'days').format('dddd D/MM');
          this.diaEvaluacion = this.diaEvaluacion[0].toUpperCase() + this.diaEvaluacion.substr(1).toLowerCase();
          await this.graficoCalorias(this.ValoresDia[i]);
          await this.graficoValores(this.ValoresDia[i]);
        }
      }
    }
}

  graficoCalorias(Periodo) {
    // Definiciones
    this.ValoresSelected = Periodo;
    const calorias = Periodo.Valores.find(x => x.ValorNutricional.Nombre === 'Calorias');

    // Calorias requeridas SIN COLACION (CAMBIAR)
    const CaloriasRequerida = Math.round(calorias.CantidadRequerida ) * 0.86;
    this.CaloriasRequerida = CaloriasRequerida;
    this.CaloriasRecomendada = calorias.CantidadConsumida;

    this.InfoCalorias.chart.upperLimit = CaloriasRequerida * 2;
    const ubicacion = this.RangosGauge(this.InfoCalorias, CaloriasRequerida, calorias.CantidadConsumida);

    this.InfoCalorias.dials.dial.forEach(x => x.value = calorias.CantidadConsumida);
    this.InfoCalorias.chart.subCaption = this.Clasificacion[ubicacion];
    this.InfoCalorias.chart.subcaptionFontColor = this.Colores[ubicacion];
  }

  graficoValores(Periodo) {
    this.ValoresSelected = Periodo;
    this.InfoValores = [];

    Periodo.Valores.forEach(valor => {
      if (valor.ValorNutricional.Nombre !== 'Calorias') {
        valor.Gauge = JSON.parse(JSON.stringify(this.GaugeLinearConf));

        let canR = Math.round(valor.CantidadRequerida);
        let canC = Math.round(valor.CantidadConsumida);
        if (canR >= 10000) {
          canR = canR / 1000;
          canC = canC / 1000;
          valor.Gauge.numberSuffix = 'K';
        }

        const ubicacion = this.RangosGauge(valor.Gauge, canR, canC);
        valor.Resultado = this.Clasificacion[ubicacion];
        valor.ColorResultado = this.Colores[ubicacion];

        valor.Gauge.trendPoints.point.forEach(x => x.startValue = canR);
        valor.Gauge.chart.upperLimit = canR * 2;
        valor.Gauge.pointers.pointer.forEach(x => x.value = canC);
        this.InfoValores.push(valor);
      }
    });
  }

  RangosGauge(configGauge, calR, calC) {
    let i = 0;
    let ubicacion = 4;
    configGauge.colorRange.color.forEach(elem => {
      elem.minValue = ((calR * 2) * this.porcMin[i]);
      elem.maxValue = ((calR * 2) * this.porcMax[i]);
      if (elem.minValue < calC && elem.maxValue > calC) {
        ubicacion = i;
      }
      i++;
    });
    return ubicacion;
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
              this.graficoValores(this.ValoresDia[i]);
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
      width: '80%',
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
