import React from 'react';
import './index.css';
import DynamicFormField from '../dynamic-form-field';

function DynamicForm(props) {

    function validateKey(key, value) {
        // TODO: Check for 'required'

        const keyObj = props.pojo.properties[key];
        let valid = false;
        let minItems = 0;
        let maxItems = Number.MAX_SAFE_INTEGER;
        let minLength = 0;
        let maxLength = Number.MAX_SAFE_INTEGER;
        
        if(keyObj.hasOwnProperty('type')) {
            switch(keyObj.type){
                case 'integer' : 
                    valid = Number.isInteger(Number(value));
                    break;

                case 'string' : 
                    minLength = keyObj.minLength ? keyObj.minLength : 0;
                    maxLength = keyObj.maxLength ? keyObj.maxLength : Number.MAX_SAFE_INTEGER;
                    valid = value.length >= minLength && value.length <= maxLength;
                    break;

                case 'array' : 
                    // TODO: Handle arrays
                    minItems = keyObj.minItems ? keyObj.minItems : 1;
                    maxItems = keyObj.maxItems ? keyObj.maxItems : Number.MAX_SAFE_INTEGER;
                    minLength = keyObj.minLength ? keyObj.minLength : 0;
                    maxLength = keyObj.maxLength ? keyObj.maxLength : Number.MAX_SAFE_INTEGER;
                    valid = value.length >= minLength && value.length <= maxLength;
                    break;
            }
        }
        else if(keyObj.hasOwnProperty('enum')){
            valid = keyObj.enum.includes(value);
        }
        return valid;
    }

    function handleSubmit(event) {
        event.persist();
        event.preventDefault();
        console.log('submitting form');
        let body = {};

        const formData = new FormData(event.target);
        let valid = false;
        for (let [key, value] of formData.entries()) {
            console.log("key:",key,", value:",value);
            valid = validateKey(key, value);
            if(valid){
                body[key] = value;
            }
            else{
                console.log('invalid input:',key,':',value);
                break;
            }
        }

        if(valid){
            console.log('form is valid. submitting...');
            fetch(props.postOn, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('success');
                    console.log(result);
                },
                (error) => {
                    console.log('error');
                    console.log(error);
                }
            )
        }
    }

    function capitalize(s){
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }

    function render() {
        let dynamicForm = <div></div>;
        if(props.pojo && props.pojo.properties){
            let dynamicFormElements = [];
            for(const key in props.pojo.properties){
                const lbl = key;
                const desc = props.pojo.properties[key].description;
                const reqd = props.pojo.required.includes(key);
                const type = props.pojo.properties[key].type;
                const items = props.pojo.properties[key].items;
                dynamicFormElements.push(
                    <label htmlFor={lbl} key={Math.random()}>
                        {capitalize(lbl)}
                        <br/>
                        <DynamicFormField properties={props.pojo.properties[key]} label={lbl} reqd={reqd} />
                        <br/>
                        <br/>
                    </label>
                )
            }

            dynamicForm = <form name="form" onSubmit={handleSubmit} >
                {dynamicFormElements}
                <input type = "submit" value = "Submit" />
            </form>;
        }
        
        return (
            <div>
                {dynamicForm}
            </div> 
        );
    }

    return render();
}

export default DynamicForm;