import {Component, Inject, OnInit} from '@angular/core';
import {EvaluacionService} from '../../_services/evaluacion.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {VerMenuConfirmRemComponent} from '../ver-menu-view/ver-menu-view.component';

@Component({
  selector: 'app-evaluacion-view',
  templateUrl: './evaluacion-view.component.html',
  styleUrls: ['./evaluacion-view.component.css'],
  providers: [EvaluacionService]
})
export class EvaluacionViewComponent implements OnInit {

  mostrarSemana = true;
  diaEvaluacion = 'Semana';

  public radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public radarChartData: any = [
    {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
  ];
  public radarChartType = 'radar';

  public canvasWidth = 200;
  public needleValue = 65;
  public centralLabel = '';
  public name = 'Calorias';
  public bottomLabel = '65';
  public options = {
    hasNeedle: true,
    needleColor: 'black',
    needleUpdateSpeed: 1000,
    arcColors: ['red', 'green', 'lightgray'],
    arcDelimiters: [30, 60],
    rangeLabel: ['0', '100'],
    needleStartValue: 50,
  };

  dataSource = {
    'chart': {
      'caption': 'Nordstorm\'s Customer Satisfaction Score for 2017',
      'lowerLimit': '0',
      'upperLimit': '100',
      'showValue': '1',
      'numberSuffix': '%',
      'theme': 'fusion',
      'showToolTip': '0'
    },
    // Gauge Data
    'colorRange': {
      'color': [{
        'minValue': '0',
        'maxValue': '50',
        'code': '#F2726F'
      }, {
        'minValue': '50',
        'maxValue': '75',
        'code': '#FFC533'
      }, {
        'minValue': '75',
        'maxValue': '100',
        'code': '#62B58F'
      }]
    },
    'dials': {
      'dial': [{
        'value': '81'
      }]
    }
  };


  constructor(private _EvaluacionService: EvaluacionService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    //const responseSemana = this._EvaluacionService.getEvaluacionSemana().toPromise();
    //const responseDia = this._EvaluacionService.getEvaluacionDia().toPromise();
    //console.log(responseSemana);
    //console.log(responseDia);
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
  }
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
