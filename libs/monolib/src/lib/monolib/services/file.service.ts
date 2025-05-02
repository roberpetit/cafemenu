import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private http: HttpClient) {}

  getFile(filePath: string): any {
    return this.http.get(filePath);
  }

  saveFile(filePath: string, data: any): any {
    console.log('Saving file:', filePath, data);
    return of(null); 
    //return this.http.post(filePath, data, { responseType: 'text' });
  }
}
