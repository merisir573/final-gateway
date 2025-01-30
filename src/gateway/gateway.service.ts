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
      headers,
      params: query,
      data,
    };

    // Forward the request using the appropriate HTTP method
    if (method === 'POST') {
      return this.httpService.post(url, data, options).pipe(map((response) => response.data));
    } else if (method === 'PUT') {
      return this.httpService.put(url, data, options).pipe(map((response) => response.data));
    } else if (method === 'DELETE') {
      return this.httpService.delete(url, options).pipe(map((response) => response.data));
    } else {
      // Default to GET for any other method
      return this.httpService.get(url, options).pipe(map((response) => response.data));
    }
  }
}
