import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GatewayService {
  constructor(private readonly httpService: HttpService) {}

  async forwardRequest(url: string, method: string, data?: any, query?: any, headers?: any) {  
    try {
      const customHeaders = { ...headers };
      delete customHeaders['content-length'];
      // Make sure the Content-Type header is passed for POST requests
      if (method === 'POST' && !customHeaders['content-type']) {
        customHeaders['content-type'] = 'application/json';
      }
      const response = await lastValueFrom(
        this.httpService.request({
          url,
          method,
          data,
          headers: headers,
          params: query,
        }),
      );
      console.log('Response from service:', response);
      return response.data;
    } catch (error) {
      console.log('Error while forwarding request:', error); // Log error details
      throw error.response?.data || new Error('Error forwarding request');
    }
  }
  
}
