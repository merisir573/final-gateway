import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GatewayService } from './gateway.service';  // Make sure to import your GatewayService
import { firstValueFrom } from 'rxjs';

@Controller('api/v1')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('medicine/v1/search')
  async queryListings(@Query() queryParams: { noOfPeople: number; country: string; city: string }) {
    try {
      const response = await firstValueFrom(
        this.gatewayService.forwardRequest(
          'https://finals-medicine.onrender.com/medicine/v1/search',
          'GET',
          null,  // No body for GET requests
          queryParams, // Use queryParams for GET
          {} // No custom headers for now
        )
      );
      return response;
    } catch (error) {
      console.error('Error forwarding the request to Query Listings', error);
      return { status: 'Error', message: 'Failed to query listings' };
    }
  }
}
