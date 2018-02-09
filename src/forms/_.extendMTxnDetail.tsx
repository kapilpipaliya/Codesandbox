import * as validatorjs from 'validatorjs';

import MobxReactForm from 'mobx-react-form'; // eslint-disable-line
// import MobxReactForm from '../../master/lib'; // load from build (MASTER)
// import MobxReactForm from '../../next/lib'; // load from build (NEXT)
// import MobxReactForm from 'master/src'; // load from source (MASTER)
// import MobxReactForm from '../../next/src'; // load from source (NEXT)

import hooks from './_.hooks';
import bindings from './_.bindings';
import dvrExtend from './extension/dvr';
// import svkExtend from './extension/svk';

import * as find from 'lodash/find';
import * as sum from 'lodash/sum';
import * as map from 'lodash/map';
import * as orderBy from 'lodash/orderBy';
import * as groupBy from 'lodash/groupBy';
import * as mapValues from 'lodash/mapValues';
import * as reduce from 'lodash/reduce';
import * as round from 'lodash/round';
import { useStrict } from 'mobx';

import {fromPromise} from 'mobx-utils'

import { observable, computed, action, extendObservable, whyRun, runInAction } from 'mobx';
import { metalCheck,
  gemCheck,
  mTxnTypePurchaseCheck} from '../utils/typesCheck';
import { flattenObj } from '../utils/Flattern';
import { AllMStocksQuery } from '../queries/sale/m_stocks/mStocksQuery';
import { flatIDValue, removeTypename, fieldObjectorFalse, fieldIDorFalse, fieldSlugorFalse } from '../utils/libs';

async function fetchStocks2(f_location_id, f_locker_id, f_accessory_id, f_material_id, f_purity_id, f_color_id, f_gem_shape_id, f_gem_clarity_id, f_gem_size_id ) {
  const stocks = await this.apolloClient.query({
    query: AllMStocksQuery,
    variables: {f_location_id: f_location_id, f_locker_id: f_locker_id, f_accessory_id: f_accessory_id, f_material_id: f_material_id, f_purity_id: f_purity_id, f_color_id: f_color_id, f_gem_shape_id: f_gem_shape_id, f_gem_clarity_id: f_gem_clarity_id, f_gem_size_id: f_gem_size_id},
  });
  return  stocks.data.allSaleMStocks
}




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
      dvr: {
        package: validatorjs,
        extend: dvrExtend,
      },
    };
  }

  options() {
    return {
      defaultGenericError: 'Invalid Data',
      // autoParseNumbers: true,
    };
  }
  
  
  
  
  
  
  
  
  
// ======1. visibility helper-------------------------------
// This function Run everywhere when Array Row is Provided: -------
  calcIsMetal(fieldRowMap) {
    return computed(() => {
      const materialValue = fieldIDorFalse(fieldRowMap.$('material_id'))
      return metalCheck(materialValue);
    })
  }
  calcIsGem(fieldRowMap) {
    return computed(() => {
      const materialValue = fieldIDorFalse(fieldRowMap.$('material_id'))
      return gemCheck(materialValue);
    })
  }
  calcIsMetalAccessory(fieldRowMap) {
    return computed(() => {
      const materialValue = fieldIDorFalse(fieldRowMap.$('material_id'))
      const AccessoryValue =  fieldRowMap.$('is_accessory').value;
      
      return (metalCheck(materialValue) && AccessoryValue);
    })
  }

// ======visibility helper end-------------------------------
// ======2. Async Fetch helper(Stock Fetch)-------------------------------
// This function Run everywhere when Array Row is Provided: -------
    @action.bound
    fetchStocks(fieldRowMap) {
        const data = fetchStocks2.call(this,
        (fieldIDorFalse(fieldRowMap.$('location_id')) || null), 
        (fieldIDorFalse(fieldRowMap.$('locker_id')) || null), 
        (fieldIDorFalse(fieldRowMap.$('accessory_id')) || null), 
        (fieldIDorFalse(fieldRowMap.$('material_id')) || null), 
        (fieldIDorFalse(fieldRowMap.$('metal_purity_id')) || null), 
        (fieldIDorFalse(fieldRowMap.$('color_id')) || null), 
        (fieldIDorFalse(fieldRowMap.$('gem_shape_id')) || null), 
        (fieldIDorFalse(fieldRowMap.$('gem_clarity_id')) || null), 
        (fieldIDorFalse(fieldRowMap.$('gem_size_id')) || null), 
        ).then(
            // inline created action
            action("fetchStocksSuccess", data => {
              // const totalSumpcs = sum(map(data, d => d.calc_pcs))                     
              // const totalSumWeight = sum(map(data, d => d.calc_weight))
              // console.log(totalSumpcs, totalSumWeight)
              
              let totalSumpcs2 = 0
              let totalSumWeight2 = 0
              data.forEach(function(item, index, array) {
                  if(!fieldRowMap.$('is_accessory').value && item.accessory_id != null) {
                  totalSumpcs2 += 0;
                  totalSumWeight2 += 0;
                } else {
                  totalSumpcs2 += item.calc_pcs;
                  totalSumWeight2 += item.calc_weight;
                }
              });
              console.log('sum', totalSumpcs2, totalSumWeight2)
              
              fieldRowMap.$('pcs').set('extra', totalSumpcs2)
              fieldRowMap.$('weight1').set('extra', totalSumWeight2)
              // this.state = "done"
            }),
            // inline created action
            action("fetchStocksError", error => {
                // this.state = "error"
            })
        )
    }
// ======Async Fetch helper end-------------------------------
// ======3.calculations helper-------------------------------
// 3.1 The magic of calculated function is it will not run if any field is not find!!!
// This function Run everywhere when Array Row is Provided: -------
// Made it to work only when rate1 field is provided.
  calcRowAmount(fieldRowMap) {
    return computed(() => {
      if(fieldRowMap.has('rate1')){ 
        if(!fieldRowMap.$('rate_on_pc').value) {
          const weight1Value = fieldRowMap.$('weight1').value || 0
          const rate1Value = parseFloat(fieldRowMap.$('rate1').value) || 0;
          return weight1Value * rate1Value;
        } else {
          const pcsValue = fieldRowMap.$('pcs').value || 0
          const rate1Value = parseFloat(fieldRowMap.$('rate1').value) || 0;
          return pcsValue * rate1Value;
        }
      } else {
        return 0;
      }
    })
  }
  
  // 3.2 Pure Weight
  // This function Run everywhere when Array Row is Provided: -------
  calcRowPureWeight(fieldRowMap) {
    return computed(() => {
      // 1. change pureweight
      const purity = fieldObjectorFalse(fieldRowMap.$('metal_purity_id')) && fieldRowMap.$('metal_purity_id').value
      if(purity) {
          let purityPer = parseFloat(purity.purity)
          const weight = fieldRowMap.$('weight1').value || 0
          let pureWeight = (parseFloat(purityPer) * weight) / 100
          return pureWeight
      } else {
        return 0;
      }
    })
  }
  // 3.3 calculate a object that has all the totals and return a object.======Last Part=============
  // This function Run everywhere when Array Row is Provided: -------
  totalMTxnDetailsObject(fieldArrayMap) {
    return computed(() => {
      let collection = []
      fieldArrayMap.fields.forEach(x=> {
        let h={}; 
        if(h['_destroy'] === true)
          return;
        h['Material']= fieldSlugorFalse(x.$('material_id')) || '---';
        h['Purity']= fieldSlugorFalse(x.$('metal_purity_id')) || '---';
        h['Shape']= fieldSlugorFalse(x.$('gem_shape_id')) || '---';
        h['Clarity']= fieldSlugorFalse(x.$('gem_clarity_id')) || '---';
        h['Color']= fieldSlugorFalse(x.$('color_id')) || '---';
        h['GemSize']= fieldSlugorFalse(x.$('gem_size_id')) || '---';
        h['Location']= fieldSlugorFalse(x.$('location_id')) || '---';
        h['Locker']= fieldSlugorFalse(x.$('locker_id')) || '---';
        h['Accessory']= fieldSlugorFalse(x.$('accessory_id')) || '---';
        // If x.$('isissue') == true we negative value.
        h['pcs']= x.$('isissue').value ? -x.$('pcs').value : x.$('pcs').value;
        
        
        // calculate carat weight:
        if(this.calcIsGem(x).get()) {
          h['carat']= x.$('isissue').value ? -x.$('weight1').value || 0 : x.$('weight1').value || 0;
        } else {
          h['carat']=0
        }
        
        if(this.calcIsMetal(x).get()) {
          h['weight']= x.$('isissue').value ? -x.$('weight1').value || 0 : x.$('weight1').value || 0;
        } else if(this.calcIsGem(x).get()) {
          h['weight']= x.$('isissue').value ? -x.$('weight1').value/5 || 0 : x.$('weight1').value/5 || 0;
        } else {
          h['weight']= x.$('isissue').value ? -x.$('weight1').value || 0 : x.$('weight1').value || 0;
        }
          h['pure']=x.$('isissue').value ? -this.calcRowPureWeight(x).get() : this.calcRowPureWeight(x).get()
        if(x.has('rate1')){ h['amount']=this.calcRowAmount(x).get() }
        collection.push(h);})
      console.log('collection:', collection)
      return collection;
    })
  }
  
  // Mini Object Version Start From Above Object!!
  // -------
  // We pass row and it calculates its 'm_txn_details' arrays total Diamond Pcs and weight.
  // I have to make this function as computed, instead of action otherwise auto-linking not working.
  // this 5 function set same in order and _extendMTxnDetail
  diamondReducer(fieldRow) {
    return computed(() => {
      const collection = this.totalMTxnDetailsObject(fieldRow.$('m_txn_details')).get()
      const groupedData = collection.reduce((acc, cv) => {
    		const key = JSON.stringify([cv['Material']]);
        if (Object.prototype.hasOwnProperty.call(acc, key)) {
    	    const existingEntry = acc[key];
          existingEntry.pcs += cv.pcs;
          existingEntry.weight += cv.weight;
        } else {
        	acc[key] = cv;
        }
        return acc;
      }, {})
      return groupedData;
    })
  }

  calcJobDPcs(fieldRow) {
    return computed(() => {
      // if(initial) {return initial.value.diamond_pcs }
      const groupedData = this.diamondReducer(fieldRow).get()
      let totalPcs = 0
      if groupedData.hasOwnProperty("[\"D\"]") {
        totalPcs = groupedData["[\"D\"]"].pcs
      }
      return totalPcs;
    })
  }
  calcJobDWeight(fieldRow) {
    return computed(() => {
      // if(initial) {return initial.value.diamond_weight }
      const groupedData = this.diamondReducer(fieldRow).get()
      let totalWeight = 0
      if groupedData.hasOwnProperty("[\"D\"]") {
        totalWeight = groupedData["[\"D\"]"].carat
      }
      return totalWeight;
    })
  }
  calcJobCSPcs(fieldRow) {
    return computed(() => {
      // if(initial) {return initial.value.cs_pcs }
      const groupedData = this.diamondReducer(fieldRow).get()
      let totalPcs = 0
      if groupedData.hasOwnProperty("[\"C\"]") {
        totalPcs = groupedData["[\"C\"]"].pcs
      }
      return totalPcs;
    })
  }
  calcJobCSWeight(fieldRow) {
    return computed(() => {
      // if(initial) {return initial.value.cs_weight }
      const groupedData = this.diamondReducer(fieldRow).get()
      let totalWeight = 0
      if groupedData.hasOwnProperty("[\"C\"]") {
        totalWeight = groupedData["[\"C\"]"].carat
      }
      return totalWeight;
    })
  }
  calcJobAllWeight(fields) {
    return computed(() => {
      const collectionArray = this.totalMTxnDetailsObject(fields).get()
      const total = collectionArray.reduce((acc, value) => acc + value.weight, 0)
      return total
    })
  }
  
  
  // Mini Object Version End
  
  // Any Row Net Weight and Pure Weight Function:
  calcJobMaterial(fieldRow) {
    return computed(() => {
      const jobValue = fieldObjectorFalse(fieldRow.$('job_id')
      if(typeof jobValue === 'object') { 
        return jobValue.material_id.slug;
      } else {
        return 0;
      }
   })
  }
  calcJobPurity(fieldRow) {
    return computed(() => {
      const jobValue = fieldObjectorFalse(fieldRow.$('job_id')
      if(typeof jobValue === 'object') { 
        return jobValue.metal_purity_id.slug;
      } else {
        return 0;
      }
   })
  }
  calcJobColor(fieldRow) {
    return computed(() => {
      const jobValue = fieldObjectorFalse(fieldRow.$('job_id')
      if(typeof jobValue === 'object') { 
        return jobValue.metal_color_id.slug;
      } else {
        return 0;
      }
   })
  }
  calcJobQty(fieldRow) {
    return computed(() => {
      const jobValue = fieldObjectorFalse(fieldRow.$('job_id')
      if(typeof jobValue === 'object') { 
        return jobValue.qty;
      } else {
        return 0;
      }
   })
  }
  
  
  calcJobnetWeight(fieldRow) {
    return computed(() => {
      return 0
      const jobValue = fieldObjectorFalse(fieldRow.$('job_id')
      if(typeof jobValue === 'object') { 
        // const metalPurityValue = fieldRow.$('metal_purity_id').value
        // let volume = parseFloat(jobValue.volume) || 0
        // const specific_density = parseFloat(metalPurityValue.specific_density) || 0
        // let netWeightNew = specific_density * volume
        // return netWeightNew;
        return jobValue.net_weight
      } else {
        return 0;
      }
   })
  }
  // calculate Job Pure weight
  calcJobPureWeight(fieldRow) {
    return computed(() => {
      return 0
      const jobValue = fieldObjectorFalse(fieldRow.$('job_id')
      if(typeof jobValue == 'object') { 
        // const metalPurityValue = fieldRow.$('metal_purity_id').value
        // let purityPer = parseFloat(metalPurityValue.purity) || 0
        // const netWeightNew = this.calcJobnetWeight(fieldRow) || 0
        // let pureWeight = (parseFloat(purityPer) * netWeightNew) / 100
        // return pureWeight;
        return jobValue.pure_weight
      } else {
        return 0;
      }
    })
  }
  
  // Any Row + MTxnDetail Functions ============================================================
  // Same Type Of Function in order and _.extendMTxnDetail
  calcJobGrossWeight(fieldRow) {
    return computed(() => {
      // if(initial) {return initial.value.gross_weight }
      
      const netWeight = this.calcJobnetWeight(fieldRow).get()
      const grossWeight = netWeight  - ((this.calcJobDWeight(fieldRow).get() +  this.calcJobCSWeight(fieldRow).get())/5)
      return grossWeight;
    })
  }
  
  
  // calculate a object that has all the totals and return a object.======Last Part=============
  //  100 % Same in order and _.extendMTxnDetail
  totalAllJobsObject(fieldMap) {
    return computed(() => {
      console.log("totalAllJobsRuns...")
      //Re - Write this function completely....
      // const collection = fieldMap.values();
    let collection = []
      fieldMap.fields.forEach(x=> {
        let h={}; 
        if(h['_destroy'] === true)
          return;
        // h['Material']= (typeof x.$('material_id').value === 'object' && x.$('material_id').value.hasOwnProperty('slug')) ? x.$('material_id').value.slug : '---';
        // h['Purity']= (typeof x.$('metal_purity_id').value === 'object' && x.$('metal_purity_id').value.hasOwnProperty('slug')) ? x.$('metal_purity_id').value.slug : '---';
        // h['Color']= (typeof x.$('metal_color_id').value === 'object' && x.$('metal_color_id').value.hasOwnProperty('slug')) ? x.$('metal_color_id').value.slug : '---';
        // h['qty']=x.$('qty').value || 0;
        h['Material']= this.calcJobMaterial(x).get();
        h['Purity']= this.calcJobPurity(x).get();
        h['Color']= this.calcJobColor(x).get();
        h['qty']= this.calcJobQty(x).get();
        h['net_weight']=this.calcJobnetWeight(x).get();
        h['pure_weight']=this.calcJobPureWeight(x).get();
        h['diamond_pcs']=this.calcJobDPcs(x).get();
        h['diamond_weight']=this.calcJobDWeight(x).get();
        h['cs_pcs']=this.calcJobCSPcs(x).get();
        h['cs_weight']=this.calcJobCSWeight(x).get();
        h['gross_weight']=this.calcJobGrossWeight(x).get();
        collection.push(h);})
      // const o = orderBy(collection, 'material_id', ['asc' ]);
      // const g = groupBy(o, 'material_id');
      // const mapObject = mapValues(g, n => reduce(n, function(sum, v) { return sum + v.qty; }, 0));
      const groupedData = collection.reduce((acc, cv) => {
      		const key = JSON.stringify([cv['Material'], cv['Purity'], cv['Color']]);
          if (Object.prototype.hasOwnProperty.call(acc, key)) {
      	    const existingEntry = acc[key];
            existingEntry.qty += cv.qty;
            existingEntry.net_weight += cv.net_weight;
            existingEntry.pure_weight += cv.pure_weight;
            existingEntry.diamond_pcs += cv.diamond_pcs;
            existingEntry.diamond_weight += cv.diamond_weight;
            existingEntry.cs_pcs += cv.cs_pcs;
            existingEntry.cs_weight += cv.cs_weight;
            existingEntry.gross_weight += cv.gross_weight;
          } else {
          	acc[key] = cv;
          }
          return acc;
      }, {})
      return groupedData;
    })
  }
  // use total object and return an array
  totalAllJobs(fieldMap) {
    return computed(() => {
      const groupedDataObject = this.totalAllJobsObject(fieldMap).get();
      const backToArray = Object.getOwnPropertyNames(groupedDataObject).map(k => groupedDataObject[k]);
      return backToArray;
    })
  }
  
  
  // =======================
    // ====================
    // added row, value, fetch arguments
  async metalmaterialIdSet(addedRow,material_id){
  const metalMaterialField = addedRow.$('material_id');
  const data = await this.fetchExtendMTxnDetailsMaterials.call(this, metalMaterialField, 1)
  runInAction(() => {
    metalMaterialField.set('extra', data);
    metalMaterialField.set('value', data.find(function(o) { return o.id == material_id }) );
  })
  }
  async gemmaterialIdSet(addedRow,material_id){
  const metalMaterialField = addedRow.$('material_id');
  const data = await this.fetchExtendMTxnDetailsMaterials.call(this, metalMaterialField, 2)
  runInAction(() => {
    metalMaterialField.set('extra', data);
    metalMaterialField.set('value', data.find(function(o) { return o.id == material_id }) );
  })
  }
  async purityIdSet(addedRow,metal_purity_id, material_id){
  const metalPurityField = addedRow.$('metal_purity_id');
  const data = await this.fetchExtendMTxnDetailsMetalPurities.call(this, metalPurityField, parseInt(material_id))
  runInAction(() => {
    metalPurityField.set('extra', data);
    metalPurityField.set('value', data.find(function(o) { return o.id == metal_purity_id; }) );
  })
  }
  async gemShapeIdSet(addedRow,gem_shape_id, material_id){
  const gemShapeField = addedRow.$('gem_shape_id');
  const data = await this.fetchExtendMTxnDetailsGemShapes.call(this, gemShapeField, parseInt(material_id))
  runInAction(() => {
    gemShapeField.set('extra', data);
    if(gem_shape_id == null) { gemShapeField.set('value', data[0]) } else {
      gemShapeField.set('value', data.find(function(o) { return o.id == gem_shape_id; }) ); }
  })
  }
  async gemClarityIdSet(addedRow,gem_clarity_id, material_id){
  const gemClarityField = addedRow.$('gem_clarity_id');
  const data = await this.fetchExtendMTxnDetailsGemClarities.call(this, gemClarityField, parseInt(material_id))
  runInAction(() => {
    gemClarityField.set('extra', data);
    if(gem_clarity_id == null) { gemClarityField.set('value', data[0]) } else {
      gemClarityField.set('value', data.find(function(o) { return o.id == gem_clarity_id; }) ); }
  })
  }
  async colorIdSet(addedRow,color_id, material_id){
  const metalColorField = addedRow.$('color_id');
  const data = await this.fetchExtendMTxnDetailsColors.call(this, metalColorField, parseInt(material_id))
  runInAction(() => {
    metalColorField.set('extra', data);
    if(color_id == null) { metalColorField.set('value', data[0]) } else {
      metalColorField.set('value', data.find(function(o) { return o.id == color_id; }) ); }
  })
  }
  async gemSizeIdSet(addedRow,gem_size_id){
  const gemSizeField = addedRow.$('gem_size_id');
  const data = await this.fetchExtendMTxnDetailsGemSizes.call(this, gemSizeField, parseInt(addedRow.$('material_id').value.id), parseInt(addedRow.$('gem_shape_id').value.id), parseInt(addedRow.$('gem_clarity_id').value.id))
  runInAction(() => {
    gemSizeField.set('extra', data);
    if(gem_size_id == null) { gemSizeField.set('value', data[0]) } else {
      gemSizeField.set('value', data.find(function(o) { return o.id == gem_size_id; }) ); }
  })
  }
  async locationIdSet(addedRow, location_id){
  const locationField = addedRow.$('location_id');
  const data = await this.fetchExtendMTxnDetailsLocations.call(this, locationField)
  runInAction(() => {
    locationField.set('extra', data);
    locationField.set('value', data.find(function(o) { return o.id == location_id; }) );
  })
  this.mTxnDetailLocationIdOnChange(locationField)
  }
  async lockerIdSet(addedRow,locker_id){
  const lockerField = addedRow.$('locker_id');
  const data = await this.fetchExtendMTxnDetailsLockers.call(this, lockerField, parseInt(addedRow.$('location_id').value.id))
  runInAction(() => {
    lockerField.set('extra', data);
    if(locker_id == null) { lockerField.set('value', data[0]) } else {
      lockerField.set('value', data.find(function(o) { return o.id == locker_id; }) ); }
  })
  this.mTxnDetailLockerIdOnChange(lockerField)
  }
  async gemTypeIdSet(addedRow,gem_type_id){
  const gemTypeField = addedRow.$('gem_type_id');
  const data = await this.fetchExtendMTxnDetailsGemTypes.call(this, gemTypeField)
  runInAction(() => {
    gemTypeField.set('extra', data);
    if(gem_type_id == null) { gemTypeField.set('value', data[0]) } else {
      gemTypeField.set('value', data.find(function(o) { return o.id == gem_type_id; }) ); }
  })
  }
  
  // This function Run everywhere when field is Provided: -------
  // But only auto Included in where MTxnDetail form is Main Table.
    @action.bound
    mTxnDetailMaterialIdOnChange = (field) => {
      field.container().$('metal_purity_id').value = undefined
      field.container().$('gem_shape_id').value = undefined
      field.container().$('gem_clarity_id').value = undefined
      field.container().$('color_id').value = undefined
      field.container().$('gem_size_id').value = undefined
      this.fetchExtendMTxnDetailsMetalPurities.call(this, field.container().$('metal_purity_id'), parseInt(field.value.id));
      this.fetchExtendMTxnDetailsGemShapes.call(this, field.container().$('gem_shape_id'), parseInt(field.value.id));
      this.fetchExtendMTxnDetailsGemClarities.call(this, field.container().$('gem_clarity_id'), parseInt(field.value.id));
      this.fetchExtendMTxnDetailsColors.call(this, field.container().$('color_id'), parseInt(field.value.id));
      // Calculate Totals...Not needed... it automatically...
    }
    @action.bound
    mTxnDetailMetalPurityIdOnChange = (field) => {
      this.fetchStocks(field.container());
    }
    @action.bound
    mTxnDetailGemShapeIdOnChange = (field) => {
      this.fetchStocks(field.container());
      if(field.container().$('material_id').value != undefined && field.container().$('gem_shape_id').value != undefined && field.container().$('gem_clarity_id').value != undefined){
        field.container().$('gem_size_id').value = undefined
        this.fetchExtendMTxnDetailsGemSizes.call(this, field.container().$('gem_size_id'), parseInt(field.container().$('material_id').value.id), parseInt(field.container().$('gem_shape_id').value.id), parseInt(field.container().$('gem_clarity_id').value.id));
      }
    }
    @action.bound
    mTxnDetailGemClarityIdOnChange = (field) => {
      this.fetchStocks(field.container());
      if(field.container().$('material_id').value != undefined && field.container().$('gem_shape_id').value != undefined && field.container().$('gem_clarity_id').value != undefined){
        field.container().$('gem_size_id').value = undefined
        this.fetchExtendMTxnDetailsGemSizes.call(this, field.container().$('gem_size_id'), parseInt(field.container().$('material_id').value.id), parseInt(field.container().$('gem_shape_id').value.id), parseInt(field.container().$('gem_clarity_id').value.id));
      }
    }
    @action.bound
    mTxnDetailColorIdOnChange = (field) => { 
      this.fetchStocks(field.container());
    }
    @action.bound
    mTxnDetailGemSizeIdOnChange = (field) => {
      this.fetchStocks(field.container());}
    @action.bound
    mTxnDetailLocationIdOnChange = (field) => {
      this.fetchStocks(field.container());
      this.fetchExtendMTxnDetailsLockers.call(this, field.container().$('locker_id'), parseInt(field.value.id));
    }
    @action.bound
    mTxnDetailLockerIdOnChange = (field) => {
      this.fetchStocks(field.container());}
    
    @action.bound
    mTxnDetailIsAccessoryOnChange = (field) => {
      field.container().$('accessory_id').value = undefined; 
      this.fetchStocks(field.container()) // Fetch Stock when value is changed.
    }
    @action.bound
    mTxnDetailAccessoryIdOnChange = (field) => { 
      this.fetchStocks(field.container());
    }
    @action.bound
    mTxnDetailCustomerStockOnChange = (field) => { }
    @action.bound
    mTxnDetailIsissueOnChange = (field) => { }
  
  
  
}
