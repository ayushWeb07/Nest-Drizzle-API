import { registerAs } from '@nestjs/config';

export default registerAs('server', () => ({
  serverPort: parseInt(process.env.SERVER_PORT ?? '8080', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  apiVersion: process.env.API_VERSION ?? '1.0.0',
}));
