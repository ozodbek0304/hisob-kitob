/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as MainImport } from './routes/_main'
import { Route as MainIndexImport } from './routes/_main/index'
import { Route as MainDataCreateImport } from './routes/_main/data-create'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const MainRoute = MainImport.update({
  id: '/_main',
  getParentRoute: () => rootRoute,
} as any)

const MainIndexRoute = MainIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => MainRoute,
} as any)

const MainDataCreateRoute = MainDataCreateImport.update({
  id: '/data-create',
  path: '/data-create',
  getParentRoute: () => MainRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_main': {
      id: '/_main'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof MainImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_main/data-create': {
      id: '/_main/data-create'
      path: '/data-create'
      fullPath: '/data-create'
      preLoaderRoute: typeof MainDataCreateImport
      parentRoute: typeof MainImport
    }
    '/_main/': {
      id: '/_main/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof MainIndexImport
      parentRoute: typeof MainImport
    }
  }
}

// Create and export the route tree

interface MainRouteChildren {
  MainDataCreateRoute: typeof MainDataCreateRoute
  MainIndexRoute: typeof MainIndexRoute
}

const MainRouteChildren: MainRouteChildren = {
  MainDataCreateRoute: MainDataCreateRoute,
  MainIndexRoute: MainIndexRoute,
}

const MainRouteWithChildren = MainRoute._addFileChildren(MainRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof MainRouteWithChildren
  '/login': typeof LoginRoute
  '/data-create': typeof MainDataCreateRoute
  '/': typeof MainIndexRoute
}

export interface FileRoutesByTo {
  '/login': typeof LoginRoute
  '/data-create': typeof MainDataCreateRoute
  '/': typeof MainIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_main': typeof MainRouteWithChildren
  '/login': typeof LoginRoute
  '/_main/data-create': typeof MainDataCreateRoute
  '/_main/': typeof MainIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/login' | '/data-create' | '/'
  fileRoutesByTo: FileRoutesByTo
  to: '/login' | '/data-create' | '/'
  id: '__root__' | '/_main' | '/login' | '/_main/data-create' | '/_main/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  MainRoute: typeof MainRouteWithChildren
  LoginRoute: typeof LoginRoute
}

const rootRouteChildren: RootRouteChildren = {
  MainRoute: MainRouteWithChildren,
  LoginRoute: LoginRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_main",
        "/login"
      ]
    },
    "/_main": {
      "filePath": "_main.tsx",
      "children": [
        "/_main/data-create",
        "/_main/"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_main/data-create": {
      "filePath": "_main/data-create.tsx",
      "parent": "/_main"
    },
    "/_main/": {
      "filePath": "_main/index.tsx",
      "parent": "/_main"
    }
  }
}
ROUTE_MANIFEST_END */
