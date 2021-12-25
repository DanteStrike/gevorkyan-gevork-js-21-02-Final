interface IServerConfig {
  port: number;
  host: string;
}

const serverConfig: IServerConfig = {
  port: 5000,
  host: '127.0.0.1',
};

export default serverConfig;
