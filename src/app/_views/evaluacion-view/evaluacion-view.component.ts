import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {EvaluacionService} from '../../_services/evaluacion.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import * as moment from 'moment-timezone';
import {DatosUsuarioService} from '../../_services/datos-usuario.service';

@Component({
  selector: 'app-evaluacion-view',
  templateUrl: './evaluacion-view.component.html',
  styleUrls: ['./evaluacion-view.component.css'],
  providers: [EvaluacionService, DatosUsuarioService]
})
export class EvaluacionViewComponent implements OnInit {

  ValoresSemana;
  ValoresDia;
  Historial;
  cargaDatos = false;
  enableHistorial = false;
  datosUsuario;
  Consejos;
  sinMenus = false;

  // Periodo
  mostrarSemana;
  diaEvaluacion = 'Semana Actual';

  // Gauge Declaraciones
  CaloriasRecomendada;
  CaloriasRequerida;

  // Resultado Valor
  Colores = ['#e44a00', '#f8bd19', '#6baa01', '#f8bd19', '#e44a00'];
  Clasificacion = ['MUY BAJO', 'BAJO', 'BIEN', 'ALTO', 'DEMASIADO'];
  porcMin = [0, 0.20, 0.35, 0.65, 0.80];
  porcMax = [0.20, 0.35, 0.65, 0.80, 1];

  ColoresMicro = ['#e44a00', '#f8bd19', '#6baa01', '#6baa01'];
  ClasificacionMicro = ['MUY BAJO', 'BAJO', 'BIEN', 'BIEN'];
  porcMinMicro = [0, 0.40, 0.60, 0.85];
  porcMaxMicro = [0.40, 0.60, 0.85, 1];

  ColoresGrasa = ['#6baa01', '#6baa01', '#f8bd19', '#e44a00'];
  ClasificacionGrasa = ['BIEN', 'BIEN', 'ALTO', 'DEMASIADO'];
  porcMinGrasa = [0, 0.15, 0.30, 0.60];
  porcMaxGrasa = [0.15, 0.30, 0.60, 1];

  public InfoCalorias = {
    // Configuracion
    chart: {
      // Titulo
      caption: 'CALORIAS CONSUMIDAS',
      captionFontSize: 18,
      captionFontBold: 1,

      // Subtitulo
      subCaption: '',
      subcaptionFontSize: 24,
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
      majorTMNumber: 3,
      reverseScale: 1,

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

  GaugeLinearConfMicro = {
    chart: {
      theme: 'fusion',
      lowerLimit: 0,
      upperLimit: 100,
      numberSuffix: '',
      chartBottomMargin: 20,
      valueFontSize: 11,
      valueFontBold: 0,
      majorTMNumber: 3,
      reverseScale: 1,

    },
    colorRange: {
      color: [
        {
          minValue: 0,
          maxValue: 40,
          code: '#e44a00',
        }, {
          minValue: 40,
          maxValue: 60,
          code: '#f8bd19'
        },
        {
          minValue: 60,
          maxValue: 85,
          code: '#6baa01'
        },
        {
          minValue: 85,
          maxValue: 100,
          code: '#6baa01'
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

  GaugeLinearConfGrasa = {
    chart: {
      theme: 'fusion',
      lowerLimit: 0,
      upperLimit: 100,
      numberSuffix: '',
      chartBottomMargin: 20,
      valueFontSize: 11,
      valueFontBold: 0,
      majorTMNumber: 3,
      reverseScale: 1,

    },
    colorRange: {
      color: [
        {
          minValue: 0,
          maxValue: 15,
          code: '#6baa01',
        }, {
          minValue: 15,
          maxValue: 30,
          code: '#6baa01'
        },
        {
          minValue: 30,
          maxValue: 60,
          code: '#f8bd19'
        }, {
          minValue: 60,
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
    if (this.ValoresDia.sinMenus === true) {
      this.sinMenus = true;
    } else {
      this.ValoresSemana = await this._EvaluacionService.getEvaluacionSemana().toPromise();
      this.Historial = await this._EvaluacionService.historial().toPromise();
      this.mostrarSemana = this.datosUsuario.DefaultEvaluacion;
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
    this.cargaDatos = true;
  }

  graficoCalorias(Periodo) {
    // Definiciones
    const calorias = Periodo.Valores.find(x => x.ValorNutricional.Nombre === 'Calorias');
    this.Consejos = Periodo.Consejos;
    if (this.Consejos.length === 0) {
      this.Consejos.push('¡Has cumplido en todo. Sigue asi!');
    }
    calorias.CantidadConsumida = Math.round(calorias.CantidadConsumida);
    const CaloriasRequerida = Math.round(calorias.CantidadRequerida);
    this.CaloriasRequerida = CaloriasRequerida;
    this.CaloriasRecomendada = calorias.CantidadConsumida;

    this.InfoCalorias.chart.upperLimit = CaloriasRequerida * 2;
    const ubicacion = this.RangosGauge(this.InfoCalorias, CaloriasRequerida, calorias.CantidadConsumida, this.porcMin, this.porcMax, 2);

    this.InfoCalorias.dials.dial.forEach(x => x.value = calorias.CantidadConsumida);
    this.InfoCalorias.chart.subCaption = this.Clasificacion[ubicacion];
    this.InfoCalorias.chart.subcaptionFontColor = this.Colores[ubicacion];
  }

  graficoValores(Periodo) {
    this.InfoValores = [];
    Periodo.Valores.forEach(valor => {
      if (valor.ValorNutricional.Nombre !== 'Calorias') {

        let canR = Math.round(valor.CantidadRequerida * 100) / 100;
        let canC = Math.round(valor.CantidadConsumida * 100) / 100;

        if (valor.ValorNutricional.Nombre === 'Hierro' || valor.ValorNutricional.Nombre === 'Fibra' ||
          valor.ValorNutricional.Nombre === 'Calcio') {
          valor.Gauge = JSON.parse(JSON.stringify(this.GaugeLinearConfMicro));
          if (canR >= 10000) {
            canR = canR / 1000;
            canC = canC / 1000;
            valor.Gauge.chart.numberSuffix = 'K';
          }

          const ubicacion = this.RangosGauge(valor.Gauge, canR, canC, this.porcMinMicro, this.porcMaxMicro, 1.15);
          valor.Resultado = this.ClasificacionMicro[ubicacion];
          valor.ColorResultado = this.ColoresMicro[ubicacion];

          valor.Gauge.trendPoints.point.forEach(x => x.startValue = canR);
          valor.Gauge.chart.upperLimit = canR * 1.15;

        } else if (valor.ValorNutricional.Nombre === 'Grasa Saturada') {
          if (moment().subtract(8, 'days').format('YYYY MM DD') === moment(Periodo.FechaInicio).format('YYYY MM DD')) {
            canR = 8.5 * this.ValoresDia.length;
            canC = (Math.random() * (10 - 7) + 7) * this.ValoresDia.length;
          } else {
            canR = 8.5;
            canC = Math.random() * (10 - 7) + 7;
          }
          const calorias = Periodo.Valores.find(x => x.ValorNutricional.Nombre === 'Calorias');
          const porcentaje = (calorias.CantidadConsumida * 100) / calorias.CantidadRequerida;
          canC = Math.round((canC * porcentaje / 100) * 100) / 100;

          valor.Gauge = JSON.parse(JSON.stringify(this.GaugeLinearConfGrasa));
          valor.Gauge.chart.lowerLimit = canR * 0.85;
          valor.Gauge.chart.upperLimit = canR * 1.85;

          const ubicacion = this.RangosGauge(valor.Gauge, canR, canC, this.porcMinGrasa, this.porcMaxGrasa, 1.85);
          valor.Resultado = this.ClasificacionMicro[ubicacion];
          valor.ColorResultado = this.ColoresMicro[ubicacion];

        } else {
          valor.Gauge = JSON.parse(JSON.stringify(this.GaugeLinearConf));
          const ubicacion = this.RangosGauge(valor.Gauge, canR, canC, this.porcMin, this.porcMax, 2);
          valor.Resultado = this.Clasificacion[ubicacion];
          valor.ColorResultado = this.Colores[ubicacion];

          valor.Gauge.trendPoints.point.forEach(x => x.startValue = canR);
          valor.Gauge.chart.upperLimit = canR * 1.15;
        }

        valor.Gauge.pointers.pointer.forEach(x => x.value = canC);
        this.InfoValores.push(valor);
      }
    });
  }

  RangosGauge(configGauge, calR, calC, porcMin, porcMax, limit) {
    let i = 0;
    let ubicacion = 4;
    configGauge.colorRange.color.forEach(elem => {
      elem.minValue = ((calR * limit) * porcMin[i]);
      elem.maxValue = ((calR * limit) * porcMax[i]);
      if (calC >= elem.minValue && calC <= elem.maxValue) {
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
        width: '80%',
        data: this.ValoresDia.length
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
      this.diaEvaluacion = 'Semana Actual';
      this.graficoCalorias(this.ValoresSemana);
      this.graficoValores(this.ValoresSemana);
    }
  }

  historial() {
    const dialogRef = this.dialog.open(EvaluacionHistorialComponent, {
      width: '80%',
      data: this.Historial
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res === false) {
        if (this.enableHistorial) {
          this.enableHistorial = false;
          this.diaEvaluacion = 'Semana Actual';
          this.graficoCalorias(this.ValoresSemana);
          this.graficoValores(this.ValoresSemana);
        }
      } else {
        if (res !== undefined) {
          this.enableHistorial = true;
          this.diaEvaluacion = 'Semana del ' + moment(this.Historial[res].FechaInicio).format('D/MM');
          this.graficoCalorias(this.Historial[res]);
          this.graficoValores(this.Historial[res]);
        }
      }
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
    for (let i = 1; i <= this.data; i++) {
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
export class EvaluacionHistorialComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<EvaluacionHistorialComponent>) {
  }

  selectHistorial = [];
  semanaElegida;

  confirmar() {
    this.dialogRef.close(this.semanaElegida);
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  ngOnInit() {
    let aux: any[];
    aux = this.data;
    for (let i = 0; i < aux.length; i++) {
      const texto = 'Semana del ' + moment(aux[i].FechaInicio).format('D/MM');
      this.selectHistorial.push({
        value: i,
        text: texto
      });
    }
    this.selectHistorial.reverse();
  }

}
