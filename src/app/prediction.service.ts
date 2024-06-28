import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private apiUrl = 'http://localhost:5000/predict'; // Adjust the URL as needed

  constructor(private http: HttpClient) { }

  getPrediction(csvData: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/csv'
    });
    return this.http.post<any>(this.apiUrl, csvData, { headers });
  }
}
