import {Component, Inject, OnInit} from '@angular/core';
import {EvaluacionService} from '../../_services/evaluacion.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-evaluacion-view',
  templateUrl: './evaluacion-view.component.html',
  styleUrls: ['./evaluacion-view.component.css'],
  providers: [EvaluacionService]
})
export class EvaluacionViewComponent implements OnInit {

  mostrarSemana = true;
  diaEvaluacion = 'Semana';
  ValoresSemana;
  ValoresDia;
  ValoresSelected;
  CaloriasRecomendada;
  CaloriasRequerida;
  cargaDatos = false;

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
      color: [{
        minValue: 0,
        maxValue: 20,
        code: '#e44a00',
      }, {
        minValue: 20,
        maxValue: 40,
        code: '#f8bd19'
      }, {
        minValue: 40,
        maxValue: 60,
        code: '#6baa01',
        display: 'Hola'
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

  public InfoValores = {
    radarChartLabels:
      ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    radarChartData: [{
      data:
        [65, 59, 90, 81, 56, 55, 40],
      label: 'Series A'
    }, {
      data:
        [28, 48, 40, 19, 96, 27, 100],
      label: 'Series B'
    }],
    radarChartType: 'radar'
  };

  constructor(private _EvaluacionService: EvaluacionService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    this.ValoresDia = await this._EvaluacionService.getEvaluacionDia().toPromise();
    this.ValoresSemana = await this._EvaluacionService.getEvaluacionSemana().toPromise();
    this.cargaDatos = true;

    console.log(this.ValoresDia);
    if (this.mostrarSemana) {
      this.graficoCalorias(this.ValoresSemana);
    } else {
      this.graficoCalorias(this.ValoresDia);
    }
  }

  async graficoCalorias(Periodo) {
    // Definiciones
    let i = 0, ubicacion = 0;
    const porcMin = [0, 0.1, 0.3, 0.7, 0.9];
    const porcMax = [0.1, 0.3, 0.7, 0.9, 1];
    const colores = ['#e44a00', '#f8bd19', '#6baa01', '#f8bd19', '#e44a00'];
    const subCaption = ['MUY BAJO', 'BAJO', 'BIEN', 'ALTO', 'DEMASIADO'];
    this.ValoresSelected = Periodo;

    console.log(Periodo);
    const calorias = Periodo.Valores.find(x => x.ValorNutricional.Nombre === 'Calorias');

    // Calorias requeridas SIN COLACION (CAMBIAR)
    const CaloriasRequerida = Math.round((calorias.CantidadRequerida * 100) / 100) * 0.86;
    this.CaloriasRequerida = CaloriasRequerida;
    this.CaloriasRecomendada = calorias.CantidadConsumida;

    this.InfoCalorias.chart.upperLimit = CaloriasRequerida * 2;
    this.InfoCalorias.colorRange.color.forEach(function (element) {
      element.minValue = ((CaloriasRequerida * 2) * porcMin[i]);
      element.maxValue = ((CaloriasRequerida * 2) * porcMax[i]);
      if (element.minValue < calorias.CantidadConsumida && element.maxValue > calorias.CantidadConsumida) {
        ubicacion = i;
      }
      i++;
    });
    this.InfoCalorias.dials.dial.forEach(x => x.value = calorias.CantidadConsumida);
    this.InfoCalorias.chart.subCaption = subCaption[ubicacion];
    this.InfoCalorias.chart.subcaptionFontColor = colores[ubicacion];

  }

  async graficoValores() {

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
        } else {
          this.mostrarSemana = !this.mostrarSemana;
        }
      });
      dialogRef.backdropClick().subscribe(x => {
        this.mostrarSemana = !this.mostrarSemana;
      });
    } else {
      this.diaEvaluacion = 'Semana';
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
      width: '80%'
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res !== undefined) {
        console.log(res);
      }
    });

  }

}

@Component({
  selector: 'app-evaluacion-view-switch',
  templateUrl: './evaluacion-view-switch.component.html',
  styleUrls: ['./evaluacion-view.component.css'],
})
export class EvaluacionSwitchComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<EvaluacionSwitchComponent>) {
  }

  DiasSemana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  Selected;

  confirmar(dia) {
    this.dialogRef.close(dia);
  }

  cancelar() {
    this.dialogRef.close();
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

  DiasSemana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  Selected = {
    dia: null,
    config: null
  };
  defaultConfig = [
    {value: true, titulo: 'Semana'},
    {value: false, titulo: 'Dia'}];

  confirmar(res) {
    this.dialogRef.close(res);
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
