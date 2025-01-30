import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { GatewayService } from './gateway.service';

@Controller('api/v1')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @All('*')
  async forward(@Req() req: Request, @Res() res: Response) {
    const { method, body, query, headers, path } = req;
    console.log('Received query parameters:', query);

    // Log for debugging purposes
    console.log('Received request method:', method);
    console.log('Received request path:', path);

    const targetServiceUrl = this.mapRouteToService(path);
    console.log('Target service URL:', targetServiceUrl);

    try {
      const response = await this.gatewayService.forwardRequest(
        targetServiceUrl,
        method,
        body,
        query,
        headers
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  // Method to dynamically map routes to the corresponding services
  private mapRouteToService(path: string): string {
    // Strip the '/api/v1' prefix from the incoming path
    const pathWithoutPrefix = path.replace(/^\/api\/v1/, '');

    if (pathWithoutPrefix.startsWith('/medicine/v1')) {
      return `https://finals-medicine.onrender.com${pathWithoutPrefix}`;
    } else if (pathWithoutPrefix.startsWith('/doctor/v1')) {
      return `https://finals-doctor.onrender.com${pathWithoutPrefix}`;
    } else if (pathWithoutPrefix.startsWith('/pharmacy/v1')) {
      return `https://finals-pharmacy.onrender.com${pathWithoutPrefix}`;
    } else if (pathWithoutPrefix.startsWith('/auth/v1')) {
      return `https://finals-auth.onrender.com${pathWithoutPrefix}`;
    }

    throw new Error('Route not found');
  }
}
