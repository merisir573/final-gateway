import { Controller, Post, Get, Query, Body, Headers } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('api/v1')
export class GatewayController {
  constructor(private readonly httpService: HttpService) {}

  @Post('auth/v1/register')
  async register(@Body() body: { username: string, password: string }) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('https://finals-auth.onrender.com/auth/v1/register', body)
      );
      return response.data; 
    } catch (error) {
      console.error('Error forwarding the request to register', error);
      return { status: 'Error', message: 'Failed to register user' };
    }
  }

  @Post('auth/v1/login')
  async login(@Body() body: { username: string, password: string }) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('https://finals-auth.onrender.com/auth/v1/login', body)
      );
      return response.data;
    } catch (error) {
      console.error('Error forwarding the request to login', error);
      return { status: 'Error', message: 'Failed to log in user' };
    }
  }

  @Post('doctor/v1/create-prescription')
  async createPrescription(
    @Body() body: { prescriptionId: string, patientTC: string, patientName: string, medicines: string[] },
    @Headers('Authorization') authorization: string
  ) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://finals-doctor.onrender.com/doctor/v1/create-prescription', 
          body,
          { headers: { Authorization: authorization } }
        )
      );
      return response.data;
    } catch (error) {
      console.error('Error forwarding the request to create prescription', error);
      return { status: 'Error', message: 'Failed to create prescription' };
    }
  }

  @Post('pharmacy/v1/submit-prescription')
  async submitPrescription(
    @Body() body: { prescriptionId: string, patientTC: string, patientName: string, medicines: string[] },
    @Headers('Authorization') authorization: string
  ) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://finals-pharmacy.onrender.com/pharmacy/v1/submit-prescription',
          body,
          { headers: { Authorization: authorization } }
        )
      );
      return response.data;
    } catch (error) {
      console.error('Error forwarding the request to submit prescription', error);
      return { status: 'Error', message: 'Failed to submit prescription' };
    }
  }

  @Get('medicine/v1/search')
  async queryListings(@Query() queryParams: { name: string, page: number }) {
    try {
      const response = await firstValueFrom(
        this.httpService.get('https://finals-medicine.onrender.com/medicine/v1/search', {
          params: queryParams
        })
      );
      return response.data;
    } catch (error) {
      console.error('Error forwarding the request to Query Listings', error);
      return { status: 'Error', message: 'Failed to query listings' };
    }
  }
}
