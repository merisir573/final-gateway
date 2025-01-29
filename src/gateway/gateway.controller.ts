import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { GatewayService } from './gateway.service';

@Controller('api/v1')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @All('*')
  async forward(@Req() req: Request, @Res() res: Response) {
    console.log('Received request path:', req.path); // Log the path for debugging

    const targetServiceUrl = this.mapRouteToService(req.path);
    const method = req.method;
    const data = req.body;
    const query = req.query; // Capture query parameters
    const headers = req.headers

    console.log('Target service URL:', targetServiceUrl);

    try {
      const response = await this.gatewayService.forwardRequest(targetServiceUrl, method, data, query, headers);
      res.status(200).json(response);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  private mapRouteToService(path: string): string {

    if (path.startsWith('/doctor/v1')) {
      return `https://finals-doctor.onrender.com${path}`;
    } else if (path.startsWith('/pharmacy/v1')) {
      return `https://finals-pharmacy.onrender.com${path}`;
    } else if (path.startsWith('/medicine/v1')) {
      return `https://finals-medicine.onrender.com${path}`;
    } else if (path.startsWith('/auth/v1')) {
      return `https://finals-auth.onrender.com${path}`;
    }

    throw new Error('Route not found');
  }
}
