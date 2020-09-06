import React from 'react';

function DynamicFormField(props){
    let fieldObj = null;
    let minItems = 0;
    let maxItems = Number.MAX_SAFE_INTEGER;

    if(props.properties.type === 'array' && props.properties.items){
        minItems = props.properties.minItems ? props.properties.minItems : 1;
        maxItems = props.properties.maxItems ? props.properties.maxItems : 1;
        fieldObj = [];
        for(let i = 0; i < maxItems; i++){
            fieldObj.push(<input 
            type="text" 
            name={props.label} 
            required={props.reqd} 
            placeholder={props.properties.description}
            key={Math.random()} />);
            fieldObj.push(<br />);
        }
        
    }
    else {
        fieldObj = <input 
            type="text" 
            name={props.label} 
            required={props.reqd} 
            placeholder={props.properties.description} />;
    }
    return fieldObj;
}

export default DynamicFormField;