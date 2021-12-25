const loggerConfig = {
  contextName: `uuid`,
  options: {
    logDirectory: './logs',
    fileNamePattern: '<DATE>.log',
    dateFormat: 'DD.MM.YYYY',
  },
};

export default loggerConfig;
