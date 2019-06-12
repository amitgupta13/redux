console.clear()

// People dropping off a form

const createPolicy = (name, amount)=>{
  return { //action
    type:'CREATE_POLICY',
    payload:{
      name,
      amount
    }
  }
}

const deletePolicy = (name)=>{
  return { //action
    type:'DELETE_POLICY',
    payload:{
      name
    }
  }
}

const createClaim = (name, amountToCollect)=>{
  return {
     //action
    type:'CREATE_CLAIM',
    payload:{
      name,
      amountToCollect
    
  }
}
}

//Reducers (departments)

const claimsHistory = (oldListOfClaims = [], action)=>{
  if(action.type === 'CREATE_CLAIM'){
    return [...oldListOfClaims, action.payload]
  }
  
  return oldListOfClaims;
}

const accounting = (bagOfMoney = 100, action)=>{
  if(action.type === 'CREATE_CLAIM'){
    return bagOfMoney - action.payload.amountToCollect
  }else if (action.type === 'CREATE_POLICY'){
    return bagOfMoney + action.payload.amount
  }
  return bagOfMoney;
}

const policies = (listOfPolicies=[], action)=>{
  if(action.type === 'CREATE_POLICY'){
    return [...listOfPolicies, action.payload.name];
  }else if (action.type === 'DELETE_POLICY'){
    return listOfPolicies.filter(name=>name !== action.payload.name)
  }
  
  return listOfPolicies
}

const {createStore, combineReducers} = Redux;

const ourDepartments = combineReducers({
  accounting,
  claimsHistory,
  policies
})

const store = createStore(ourDepartments)

store.dispatch(createPolicy('Alex', 20))
store.dispatch(createPolicy('Jim', 40))
store.dispatch(createPolicy('Bob', 60))

store.dispatch(createClaim('Alex', 120))
store.dispatch(createClaim('Jim', 50))
store.dispatch(deletePolicy('Jim'))


console.log(store.getState());