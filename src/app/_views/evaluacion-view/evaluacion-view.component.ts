import {Component, OnInit} from '@angular/core';
import {EvaluacionService} from '../../_services/evaluacion.service';

@Component({
  selector: 'app-evaluacion-view',
  templateUrl: './evaluacion-view.component.html',
  styleUrls: ['./evaluacion-view.component.css'],
  providers: [EvaluacionService]
})
export class EvaluacionViewComponent implements OnInit {


  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  multi: any[] = [
    {
      'name': 'Germany',
      'value': 40632
    }
  ];

  multi2: any[] = [
    {
      'name': 'Germany',
      'series': [
        {
          'name': '2010',
          'value': 7300000
        },
        {
          'name': '2011',
          'value': 8940000
        },
        {
          'name': '2012',
          'value': 8940000
        }
      ]
    },
    {
      'name': 'Germany',
      'series': [
        {
          'name': '2010',
          'value': 6300000
        },
        {
          'name': '2011',
          'value': 7940000
        },
        {
          'name': '2012',
          'value': 6940000
        }
      ]
    },
    {
      'name': 'Germany',
      'series': [
        {
          'name': '2010',
          'value': 7300000
        },
        {
          'name': '2011',
          'value': 8940000
        },
        {
          'name': '2012',
          'value': 8940000
        }
      ]
    }
  ];


  constructor(private _EvaluacionService: EvaluacionService) {
  }

  ngOnInit() {
    const response = this._EvaluacionService.getEvaluacion().toPromise();
    console.log((response));
  }

}
