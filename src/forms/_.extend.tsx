import * as validatorjs from 'validatorjs';

import MobxReactForm from 'mobx-react-form'; // eslint-disable-line
/*
 * Import MobxReactForm from '../../master/lib'; // load from build (MASTER)
 * import MobxReactForm from '../../next/lib'; // load from build (NEXT)
 * import MobxReactForm from 'master/src'; // load from source (MASTER)
 * import MobxReactForm from '../../next/src'; // load from source (NEXT)
 */

import hooks from './_.hooks';
import bindings from './_.bindings';
import dvrExtend from './extension/dvr';
// Import svkExtend from './extension/svk';

export default class Form extends MobxReactForm {
  bindings() {
    return bindings;
  }

  hooks() {
    return hooks;
  }

  // This Not Working Fuse-Box Gives Error...
  plugins() {
    return {
      'dvr': {
        'package': validatorjs,
        'extend': dvrExtend
      }
    };
  }

  options() {
    return {
      'defaultGenericError': 'Invalid Data'
      // AutoParseNumbers: true,
    };
  }
}
