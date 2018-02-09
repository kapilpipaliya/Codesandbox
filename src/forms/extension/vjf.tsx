import simulateAsyncFindUserCall from './_.async';

import { metalCheck, gemCheck, mTxnTypePurchaseSellCheck, mTxnTypeCustReturnSellCheck } from 'utils/typesCheck';
import { fieldObjectorFalse, fieldIDorFalse } from 'utils/libs';
import isEmail from 'validator/lib/isEmail';

export function checkUser({ field }) {
  const msg = `Hey! The username ${field.value} is already taken.`;
  // show error if the call does not returns entries
  return simulateAsyncFindUserCall({ user: field.value })
    .then((items) => [(items.length === 0), msg]);
}

export function shouldBeEqualTo(target) {
  return ({ field, form }) => {
    const fieldsAreEquals = (form.$(target).value === field.value);
    return [fieldsAreEquals, `The ${field.label} should be equals to ${form.$(target).label}`];
  };
}

// export function isEmail({ field }) {
//   const isValid = (field.value.indexOf('@') > 0);
//   return [isValid, `The ${field.label} should be an email address.`];
// }


    
export function requiredPurity({ form, field, validator }) {
  const materialID =  field.container().$('material_id').value;
  if (materialID != 0 && materialID != null){
    if(metalCheck(parseInt(materialID.id))){
      if(field.value == 0 || field.value == undefined){
        return [false, `The ${field.label} should be required.`];
      } else {
        return [true, 'OK'];
      }
    } else {
      return [true, 'OK'];
    }
  } else {
    return [true, 'OK'];
  } 
}

export function requiredShape({ form, field, validator }) {
  const materialID =  field.container().$('material_id').value;
  if (materialID != 0 && materialID != null){
    if(gemCheck(parseInt(materialID.id))){
      if(field.value == 0 || field.value == undefined){
        return [false, `The ${field.label} should be required.`];
      } else {
        return [true, 'OK'];
      }
    } else {
      return [true, 'OK'];
    }
  } else {
    return [true, 'OK'];
  } 
}

export function requiredClarity({ form, field, validator }) {
  const materialID =  field.container().$('material_id').value;
  if (materialID != 0 && materialID != null){
    if(gemCheck(parseInt(materialID.id))){
      if(field.value == 0 || field.value == undefined){
        return [false, `The ${field.label} should be required.`];
      } else {
        return [true, 'OK'];
      }
    } else {
      return [true, 'OK'];
    }
  } else {
    return [true, 'OK'];
  } 
}

// when checked accessory only then required.
export function requiredAccessory({ form, field, validator }) {
  const materialID =  field.container().$('material_id').value;
  const AccessoryValue =  field.container().$('is_accessory').value;
  // console.log('abc', AccessoryValue)
  if (materialID != 0 && materialID != null && AccessoryValue){
    if(metalCheck(parseInt(materialID.id))){
      if(field.value == 0 || field.value == undefined){
        return [false, `The ${field.label} should be required.`];
      } else {
        return [true, 'OK'];
      }
    } else {
      return [true, 'OK'];
    }
  } else {
    return [true, 'OK'];
  } 
}

export function requiredSize({ form, field, validator }) {
  const materialID =  field.container().$('material_id').value;
  if (materialID != 0 && materialID != null){
    if(gemCheck(parseInt(materialID.id))){
      if(field.value == 0 || field.value == undefined){
        return [false, `The ${field.label} should be required.`];
      } else {
        return [true, 'OK'];
      }
    } else {
      return [true, 'OK'];
    }
  } else {
    return [true, 'OK'];
  } 
}

export function requiredGemType({ form, field, validator }) {
  const materialID =  field.container().$('material_id').value;
  if (materialID != 0 && materialID != null){
    if(gemCheck(parseInt(materialID.id))){
      if(field.value == 0 || field.value == undefined){
        return [false, `The ${field.label} should be required.`];
      } else {
        return [true, 'OK'];
      }
    } else {
      return [true, 'OK'];
    }
  } else {
    return [true, 'OK'];
  } 
}



// If Stock is greter then extra gives error.
export function simplePcsStockCheck({ form, field, validator }) {
  const materialID =  field.container().$('material_id').value;
  const isIssue = field.container().$('isissue').value;
  if (materialID != 0 && materialID != null && isIssue){
    if(gemCheck(parseInt(materialID.id))){
      if(field.value == undefined){
        return [false, `The ${field.label} should be 0.`];
      } else {
        const pcsStockValue =  field.extra || 0;
        if(field.value > pcsStockValue) {return [false, 'Not stock.'];}
        else {return [true, 'OK']; }
      }
    } else {
      return [true, 'OK'];
    }
  } else {
    return [true, 'OK'];
  } 
}

// If Stock is greter then extra gives error.
export function simpleWeightStockCheck({ form, field, validator }) {
  const materialID =  field.container().$('material_id').value;
  const isIssue = field.container().$('isissue').value;
  if (materialID != 0 && materialID != null && isIssue){
    if(true){
      if(field.value == undefined){
        return [false, `1The ${field.label} should be required.`];
      } else {
        const weightStockValue =  field.extra || 0;
        console.log(weightStockValue, field.value);
        if(field.value > weightStockValue) {return [false, 'Not stock.'];}
        else {return [true, 'OK']; }
      }
    } else {
      return [true, 'OK'];
    }
  } else {
    return [true, 'OK'];
  } 
}

// =================Material Transaction Only Rules=================
// Rate only required if Material Transaction Type Purchase or Sell.
export function mTxnRequiredRate({ form, field, validator }) {
  const mTxnTypeID = fieldIDorFalse(form.$('m_txn_type_id'));
  if ( mTxnTypePurchaseSellCheck(mTxnTypeID)){
    if(true){
      if(field.value == undefined){
        return [false, `The ${field.label} should be >0.`];
      } else {
        if(field.value <= 0) {return [false, `The ${field.label} should be > 0.`];}
        else {return [true, 'OK']; }
      }
    } else {
      return [true, 'OK'];
    }
  } else {
    return [true, 'OK'];
  } 
}

// If Stock is greter then extra gives error.
export function mTxnPcsStockCheck({ form, field, validator }) {
  const mTxnTypeID = fieldIDorFalse(form.$('m_txn_type_id'));
  if (mTxnTypeCustReturnSellCheck(mTxnTypeID)){
    return simpleWeightStockCheck({ form, field, validator })
  }
  return [true, 'OK'];
}

// If Stock is greter then extra gives error.
export function mTxnWeightStockCheck({ form, field, validator }) {
  const mTxnTypeID = fieldIDorFalse(form.$('m_txn_type_id'));
  if (mTxnTypeCustReturnSellCheck(mTxnTypeID)){
    return simpleWeightStockCheck({ form, field, validator })
  }
  return [true, 'OK'];
}

// =============MFG TXN ONLY RULES============================
export function mfgMaterialCheck({ form, field, validator }) {
  const materialID =  field.container().$('material_id').value;
  const JobMaterialID = fieldObjectorFalse(form.$('job_id')) && form.$('job_id').value.material_id.id;
  console.log(materialID, JobMaterialID);
  if (materialID != 0 && materialID != null){
    if(metalCheck(parseInt(materialID.id))){
      if(field.value == 0 || field.value == undefined){
        return [false, `The ${field.label} should be required.`];
      } else if(materialID.id == JobMaterialID){
        return [true, 'OK'];
      } else {
        return [false, 'Metal MisMatch'];
      }
    
    } else {
      return [true, 'OK'];
    }
  } else {
    return [true, 'OK'];
  } 
}

export function mfgPurityCheck({ form, field, validator }) {
  const materialID =  field.container().$('metal_purity_id').value;
  const JobMaterialID = fieldObjectorFalse(form.$('job_id')) && form.$('job_id').value.metal_purity_id.id;
  console.log(materialID, JobMaterialID);
  if (materialID != 0 && materialID != null){
    if(metalCheck(parseInt(materialID.id))){
      if(field.value == 0 || field.value == undefined){
        return [false, `The ${field.label} should be required.`];
      } else if(materialID.id == JobMaterialID){
        return [true, 'OK'];
      } else {
        return [false, 'Metal MisMatch'];
      }
    
    } else {
      return [true, 'OK'];
    }
  } else {
    return [true, 'OK'];
  } 
}


// ====================Wax Setting and Metal Issue Rules====================
export function noDuplicateMfgJobCheck({ form, field, validator }) {
  const mfg_txns = form.$('mfg_txns')
  const currentJobId = fieldIDorFalse(field)
  let error = false;
  mfg_txns.fields.forEach(x=> {
    if (x != field.container()) {
      const job_id = fieldIDorFalse(x.$('job_id'))
      if(job_id) { 
        debugger
        if(currentJobId == job_id) {
          error = true;
        } else {
        }
      }
      
    }
  })
  if(error) return [false, `${field.label} Taken`];
  return [true, 'OK'];
}



export const shortText = (value, optional) => {
  if (value.length === 0) return optional ? null : { type: 'required' };
  if (value.length < 3) return { type: 'minLength', minLength: 3 };
  if (value.length > 140) return { type: 'maxLength', maxLength: 140 };
  return '';
};

export const email = (value, optional) => {
  if (value.length === 0) return optional ? null : { type: 'required' };
  if (!isEmail(value)) return { type: 'email' };
  return '';
};

export const password = (value, optional) => {
  if (value.length === 0) return optional ? null : { type: 'required' };
  if (value.length < 6) return { type: 'minLength', minLength: 6 };
  if (value.length > 1024) return { type: 'maxLength', maxLength: 1024 };
  return '';
};
