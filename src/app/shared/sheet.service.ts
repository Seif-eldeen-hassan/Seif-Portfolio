import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface SheetResponse {
  values: any[][];
}

@Injectable({ providedIn: 'root' })
export class SheetService {
  constructor(private http: HttpClient) {}

  getSheetData(tabName: string) {
    const sheetId = '1ptwv_OyxVmIHQzoeicjHdkt2epb750tUqWJ2GhLLeZs';
    const apiKey = 'AIzaSyAHmfeyZBzlGETonyisL8ZlEEWw8G1SurU';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${tabName}?key=${apiKey}`;
    return this.http.get<SheetResponse>(url);
  }
}

