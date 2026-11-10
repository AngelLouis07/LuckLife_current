// CRA only exposes REACT_APP_* variables. Map the requested public-key names
// after loading its standard .env files. Never put secret provider keys here.
const command = process.argv[2];
if (!['start', 'build'].includes(command)) throw new Error('Unsupported command');
process.env.NODE_ENV = command === 'build' ? 'production' : 'development';
require('react-scripts/config/env');
process.env.REACT_APP_PAYSTACK_PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY || '';
process.env.REACT_APP_STRIPE_PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY || '';
require(`react-scripts/scripts/${command}`);
