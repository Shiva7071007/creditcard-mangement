import { Request, Response, Router } from 'express';

class HealthRoute {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/health', this.checkHealth);
  }

  private checkHealth(req: Request, res: Response) {
    // You can add custom logic to check the health of your server here.
    res.status(200).send('Server is healthy');
  }
}

export default HealthRoute;
