import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class GatewayService {
  constructor(private readonly httpService: HttpService) {}

  forwardRequest(
    url: string,
    method: string,
    data: any,
    query: any,
    headers: any
  ): Observable<any> {
    // Set the correct options for the HTTP request
    const options: AxiosRequestConfig = {
      headers,
      params: query, // Pass query parameters here
      data,
    };

    // Log the URL and query parameters
    console.log('Target service URL:', url);
    console.log('Received query parameters (Service):', query);

    // Ensure the correct URL and params are logged
    const fullUrl = new URL(url, 'http://dummy.base'); // Base URL for the query
    Object.keys(query).forEach((key) =>
      fullUrl.searchParams.append(key, query[key])
    );
    console.log('Full URL with query parameters:', fullUrl.toString());

    // Switch method to handle GET, POST, PUT, DELETE
    switch (method) {
      case 'POST':
        return this.httpService
          .post(url, data, options)
          .pipe(
            map((response) => response.data),
            catchError((error) => {
              console.error('POST request error:', error);
              throw error;
            })
          );
      case 'PUT':
        return this.httpService
          .put(url, data, options)
          .pipe(
            map((response) => response.data),
            catchError((error) => {
              console.error('PUT request error:', error);
              throw error;
            })
          );
      case 'DELETE':
        return this.httpService
          .delete(url, options)
          .pipe(
            map((response) => response.data),
            catchError((error) => {
              console.error('DELETE request error:', error);
              throw error;
            })
          );
      default:
        // Default to GET for any other method
        return this.httpService
          .get(url, options)
          .pipe(
            map((response) => response.data),
            catchError((error) => {
              console.error('GET request error:', error);
              throw error;
            })
          );
    }
  }
}
