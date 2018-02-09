import { extendObservable } from 'mobx'
// import * as Uppy from 'uppy/lib/core';
// import * as Tus from 'uppy/lib/plugins/Tus';

class ConstrainsStore {
  constructor() {
    extendObservable(this, {
      server_root_url: process.env.NODE_ENV === 'development'
        ? 'https://testu1-kapilp.c9users.io:8081'
        : 'https://scejewel.herokuapp.com',
      image_endpoint: process.env.NODE_ENV === 'development'
        ? 'https://testu1-kapilp.c9users.io:8081/upload'
        : 'https://scejewel.herokuapp.com/upload',
        // const endpoint= 'https://master.tus.io/files/'
      uploadServer: 'file_storage'
    })
  }
}

export default ConstrainsStore

