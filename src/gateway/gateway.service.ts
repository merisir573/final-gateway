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
    console.log('Received query parameters (Service):', query);
    const queryString = new URLSearchParams(query).toString();
    const fullUrl = `${url}?${queryString}`;
    console.log('FullURL:', fullUrl);


    // Forward the request using the appropriate HTTP method
    if (method === 'POST') {
      return this.httpService.post(fullUrl, data, { headers }).pipe(map((response) => response.data));
    } else if (method === 'PUT') {
      return this.httpService.put(fullUrl, data, { headers }).pipe(map((response) => response.data));
    } else if (method === 'DELETE') {
      return this.httpService.delete(fullUrl, { headers }).pipe(map((response) => response.data));
    } else {
      // Default to GET for any other method
      return this.httpService.get(fullUrl, { headers }).pipe(map((response) => response.data));
    }
  }
}
