export const EnvVals = process.env;
const PORT = +EnvVals.PORT || 5000

interface ServerConfigs {
    PORT: number,
    APP_NAME: string,
    APP_VERSION: string,
    PUBLIC_URL: string,
}

const Configs: ServerConfigs = {
    PORT,
    APP_NAME: EnvVals.APP_NAME || 'NodeJs',
    APP_VERSION: EnvVals.APP_VERSION || '1.0.0',
    PUBLIC_URL: EnvVals.PUBLIC_URL || `http://localhost:${PORT}`
}

export default Configs;