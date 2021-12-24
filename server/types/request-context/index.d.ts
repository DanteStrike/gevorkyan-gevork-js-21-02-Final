declare module 'request-context' {
  import domain = require('domain');
  import express = require('express');

  function middleware(namespace: string): express.RequestHandler;
  function getContext(name: string, current?: domain.Domain): undefined | any;
  function get(name: string): undefined | any;
  function setContext(name: string, value: any, current?: domain.Domain): void;
  function set(name: string, value: any): void;
};
