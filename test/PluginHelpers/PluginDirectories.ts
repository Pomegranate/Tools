/**
 * @file PluginDirectories
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project @framework
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {directoryBasePath} from "../../src";


describe('Plugin Directory base path', function () {
  test('Namespaced Application Plugin', () => {
    let plugin = {
      builder: 'InjectableBuilder',
      state:
        {
          variables: {},
          directories: [],
          configuration:
            {
              name: 'CoolPlugin',
              type: 'anything',
              injectableParam: 'CoolPlugin',
              injectableScope: 'global',
              frameworkPlugin: false,
              applicationMember: null,
              depends: [],
              provides: [],
              optional: []
            },
          hooks: {
            load: () => {
            }, start: () => {
            }, stop: () => {
            }
          },
          commands: null,
          installs: [],
          dashboard: {}
        },
      creationMetadata:
        {
          providedValues:
            {
              variables: {},
              directories: [],
              configuration: {
                name: 'CoolPlugin',
                type: 'anything',
                injectableParam: 'CoolPlugin',
                injectableScope: 'global',
                frameworkPlugin: false,
                applicationMember: null,
                depends: [],
                provides: [],
                optional: []
              },
              hooks: {
                load: () => {
                }, start: () => {
                }, stop: () => {
                }
              },
              commands: {}
            },
          errorsFrom: null
        },
      loadMetadata:
        {
          parents: ['A', 'B'],
          moduleSrc: 'CoolPlugin.js',
          namespace: '@pom-test',
          loadSrc: 'local',
          application: false
        },
      computedMetadata:
        {
          fqn: ['@pom-test', 'A', 'B', 'CoolPlugin'],
          name: ['@pom-test', 'A', 'B', 'CoolPlugin'],
          baseDirectory: '/',
          projectDirectory: '/',
          buildDirectory: '/'
        }
    }
    let path = directoryBasePath(plugin)

    expect(path).toEqual('@pom-test/A/B/CoolPlugin')
  })

  test('Namespaced Plugin', () => {
    let plugin =  {
      builder: 'InjectableBuilder',
      state:
        {
          variables: {},
          directories: [],
          configuration:
            {
              name: 'CoolPlugin',
              type: 'anything',
              injectableParam: 'CoolPlugin',
              injectableScope: 'global',
              frameworkPlugin: false,
              applicationMember: null,
              depends: [],
              provides: [],
              optional: []
            },
          hooks: {
            load: () => {
            }, start: () => {
            }, stop: () => {
            }
          },
          commands: null,
          installs: [],
          dashboard: {}
        },
      creationMetadata:
        {
          providedValues:
            {
              variables: {},
              directories: [],
              configuration: {
                name: 'CoolPlugin',
                type: 'anything',
                injectableParam: 'CoolPlugin',
                injectableScope: 'global',
                frameworkPlugin: false,
                applicationMember: null,
                depends: [],
                provides: [],
                optional: []
              },
              hooks: {
                load: () => {
                }, start: () => {
                }, stop: () => {
                }
              },
              commands: {}
            },
          errorsFrom: null
        },
      loadMetadata:
        {
          parents: [],
          moduleSrc: 'CoolPlugin.js',
          namespace: '@pom-test',
          loadSrc: 'local',
          application: false
        },
      computedMetadata:
        {
          fqn: ['@pom-test', 'CoolPlugin'],
          name: ['@pom-test', 'CoolPlugin'],
          baseDirectory: '/',
          projectDirectory: '/',
          buildDirectory: '/'
        }
    }
    let path = directoryBasePath(plugin)

    expect(path).toEqual('@pom-test/CoolPlugin')
  })

  test('Local Multiple Plugin', () => {
    let plugin =  {
      builder: 'InjectableBuilder',
      state:
        {
          variables: {},
          directories: [],
          configuration:
            {
              name: 'CoolPlugin',
              type: 'anything',
              injectableParam: 'CoolPlugin',
              injectableScope: 'global',
              frameworkPlugin: false,
              applicationMember: null,
              depends: [],
              provides: [],
              optional: []
            },
          hooks: {
            load: () => {
            }, start: () => {
            }, stop: () => {
            }
          },
          commands: null,
          installs: [],
          dashboard: {}
        },
      creationMetadata:
        {
          providedValues:
            {
              variables: {},
              directories: [],
              configuration: {
                name: 'CoolPlugin',
                type: 'anything',
                injectableParam: 'CoolPlugin',
                injectableScope: 'global',
                frameworkPlugin: false,
                applicationMember: null,
                depends: [],
                provides: [],
                optional: []
              },
              hooks: {
                load: () => {
                }, start: () => {
                }, stop: () => {
                }
              },
              commands: {}
            },
          errorsFrom: null
        },
      loadMetadata:
        {
          parents: [],
          moduleSrc: 'CoolPlugin.js',
          namespace: null,
          loadSrc: 'local',
          application: false
        },
      computedMetadata:
        {
          fqn: ['A','B', 'CoolPlugin'],
          name: ['A','B', 'CoolPlugin'],
          baseDirectory: '/',
          projectDirectory: '/',
          buildDirectory: '/'
        }
    }
    let path = directoryBasePath(plugin)
    expect(path).toEqual('A/B/CoolPlugin')
  })

  test('Local Plugin', () => {
    let plugin =  {
      builder: 'InjectableBuilder',
      state:
        {
          variables: {},
          directories: [],
          configuration:
            {
              name: 'CoolPlugin',
              type: 'anything',
              injectableParam: 'CoolPlugin',
              injectableScope: 'global',
              frameworkPlugin: false,
              applicationMember: null,
              depends: [],
              provides: [],
              optional: []
            },
          hooks: {
            load: () => {
            }, start: () => {
            }, stop: () => {
            }
          },
          commands: null,
          installs: [],
          dashboard: {}
        },
      creationMetadata:
        {
          providedValues:
            {
              variables: {},
              directories: [],
              configuration: {
                name: 'CoolPlugin',
                type: 'anything',
                injectableParam: 'CoolPlugin',
                injectableScope: 'global',
                frameworkPlugin: false,
                applicationMember: null,
                depends: [],
                provides: [],
                optional: []
              },
              hooks: {
                load: () => {
                }, start: () => {
                }, stop: () => {
                }
              },
              commands: {}
            },
          errorsFrom: null
        },
      loadMetadata:
        {
          parents: [],
          moduleSrc: 'CoolPlugin.js',
          namespace: null,
          loadSrc: 'local',
          application: false
        },
      computedMetadata:
        {
          fqn: ['CoolPlugin'],
          name: ['CoolPlugin'],
          baseDirectory: '/',
          projectDirectory: '/',
          buildDirectory: '/'
        }
    }
    let path = directoryBasePath(plugin)
    expect(path).toEqual('CoolPlugin')
  })
});