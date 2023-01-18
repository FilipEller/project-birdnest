const { NODE_ENV } = process.env;
const PORT = Number(process.env.PORT) | 3001;
const BIRDNEST_URL = 'http://assignments.reaktor.com/birdnest';

export { NODE_ENV, PORT, BIRDNEST_URL };
