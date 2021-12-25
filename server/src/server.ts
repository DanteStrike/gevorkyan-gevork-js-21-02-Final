import serverConfig from './configs/serverConfig';
import app from './app';

const {port, host} = serverConfig;
// eslint-disable-next-line no-console
app.listen(port, host, () => console.log(`Server is listening on port ${port}!`));
