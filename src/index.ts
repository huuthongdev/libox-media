import { app } from './app';
import Configs from './configs';

async function main() {
    console.log(` \ 
    \n###### Server information ###### \
    \n \
    \n- APP_NAME: ${Configs.APP_NAME} \
    \n- APP_VERSION: ${Configs.APP_VERSION} \
    \n- PORT: ${Configs.PORT} \
    \n- PUBLIC_URL: ${Configs.PUBLIC_URL} \
    \n`)


    app.listen(Configs.PORT, () => {
        console.log(`••• Server start success.\n`);
    });
}

main();