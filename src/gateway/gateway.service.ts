import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GatewayService {
  constructor(private readonly httpService: HttpService) {}

  // General method for forwarding requests dynamically
  forwardRequest(
    url: string,
    method: string,
    data: any,
    query: any,
    headers: any
  ): Observable<any> {
    const options = {
      headers
    };

    console.log('Received query parameters (Service):', query);
    console.log('Received query parameters (Service):', options);
    console.log('Received query parameters (Service):', this.httpService.get(url, options).pipe(map((response) => response.data)));

    const queryString = new URLSearchParams(query).toString();
    const fullUrl = `${url}?${queryString}`;

    if (method === 'POST') {
      return this.httpService.post(fullUrl, data, options).pipe(map((response) => {
        console.log('Response from target service (POST):', response.data);  // Log the response data
        return response.data;
      }));
    } else if (method === 'PUT') {
      return this.httpService.put(fullUrl, data, options).pipe(map((response) => {
        console.log('Response from target service (PUT):', response.data);  // Log the response data
        return response.data;
      }));
    } else if (method === 'DELETE') {
      return this.httpService.delete(fullUrl, options).pipe(map((response) => {
        console.log('Response from target service (DELETE):', response.data);  // Log the response data
        return response.data;
      }));
    } else {
      // For GET request
      return this.httpService.get(fullUrl, options).pipe(map((response) => {
        console.log('Response from target service (GET):', response.data);  // Log the response data
        return response.data;
      }));
    }
  }
}
