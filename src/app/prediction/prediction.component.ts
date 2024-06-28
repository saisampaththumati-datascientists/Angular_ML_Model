import { Component, OnInit } from '@angular/core';
import { PredictionService } from '../prediction.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
// export class PredictionComponent {
//   form: FormGroup;
//   prediction: any;

//   constructor(private fb: FormBuilder, private predictionService: PredictionService) {
//     this.form = this.fb.group({
//       no_of_adults: [''],
//       no_of_children: [''],
//       no_of_weekend_nights: [''],
//       no_of_week_nights: [''],
//       required_car_parking_space: [''],
//       lead_time: [''],
//       arrival_year: [''],
//       arrival_month: [''],
//       arrival_date: [''],
//       repeated_guest: [''],
//       no_of_previous_cancellations: [''],
//       no_of_previous_bookings_not_canceled: [''],
//       avg_price_per_room: [''],
//       no_of_special_requests: ['']
//     });

//   }

//   ngOnInit(): void {
//     // this.addFeature(); // Initialize with one input by default
//   }

//   get features(): FormArray {
//     return this.form.get('form') as FormArray;
//   }

//   // addFeature(): void {
//   //   this.features.push(this.fb.control('', Validators.required));
//   // }

//   // removeFeature(index: number): void {
//   //   this.features.removeAt(index);
//   // }

//   getPrediction(): void {
//     const csvData = this.features.value.join(',');

//     this.predictionService.getPrediction(csvData).subscribe(
//       response => {
//         this.prediction = response.prediction;
//         console.log('Prediction:', this.prediction);
//       },
//       error => {
//         console.error('Error:', error);
//       }
//     );
//   }
// }
export class PredictionComponent implements OnInit {
  form: FormGroup;
   prediction: any;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      no_of_adults: ['', [Validators.required, Validators.min(1)]],
      no_of_children:['', [Validators.required]],
      no_of_weekend_nights: ['', [Validators.required]],
      no_of_week_nights: ['', [Validators.required]],
      required_car_parking_space: ['', [Validators.required]],
      lead_time: ['', [Validators.required]],
      arrival_year: ['', [Validators.required]],
      arrival_month: ['', [Validators.required]],
      arrival_date: ['', [Validators.required]],
      repeated_guest: ['', [Validators.required]],
      no_of_previous_cancellations: ['', [Validators.required]],
      no_of_previous_bookings_not_canceled: ['', [Validators.required]],
      avg_price_per_room: ['', [Validators.required, Validators.min(1)]],
      no_of_special_requests: ['', [Validators.required, Validators.min(1)]],
      type_of_meal_plan:['', [Validators.required, Validators.min(1)]],
      room_type_reserved:['', [Validators.required, Validators.min(1)]],
      market_segment_type:['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const formData = this.form.value;
    console.log("i am here")
    this.http.post<{ prediction: string }>('http://127.0.0.1:5000/predict', formData)
    .subscribe(response => {
        console.log(response.prediction)
        this.prediction = response.prediction;
      });
  }
}
