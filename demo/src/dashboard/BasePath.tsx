console.log('NODE_ENV:', process.env.NODE_ENV);

const isEnvProduction = process.env.NODE_ENV === 'production';

const isEnvNotLocalhost = window.location.hostname !== 'localhost' && !window.location.href.includes('127.0.0.1');

const baseRelativePath = (isEnvProduction && isEnvNotLocalhost) ? process.env.BASE_RELATIVE_PATH : '';

export default baseRelativePath;