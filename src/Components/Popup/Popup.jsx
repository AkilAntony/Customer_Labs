import React, {useCallback, useEffect, useState} from 'react'
import './Popup.css'
import Header from '../Header/Header'
import Dropdown from '../Dropdown/Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import Warning from '../Warning/Warning';

const options = [
  { label: 'First Name', value: 'first_name' ,color:'green'},
  { label: 'Last Name', value: 'last_name',color:'green' },
  { label: 'Gender', value: 'gender',color:'green' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city',color:'red' },
  { label: 'State', value: 'state' },
];

const Popup = () => {
    const [segment,setSegment] = useState('');
    const [dropdownOption, setDropdownOption] = useState(options)
    const [schemaOption, setSchemaoption] = useState('');
    const [filteredoption, setFilteredOption] =  useState([]);
    const [warning, setWarning] = useState('');
    const [unSelectedoptions, setUnselectedOptions] = useState([])
    let newOption;
    console.log(segment)
    const handleDropdown = useCallback((value)=>{
        setSchemaoption(value);
    },[])

    useEffect(() => {
        const unselected = options.filter(
            option => !filteredoption.some(filtered => filtered.value === option.value)
        );
        setUnselectedOptions(unselected);
    }, [filteredoption]);

    // trigger when the user clicks the addNewSchema
    const handleClick = () =>{
        newOption  =  options.find(data=>data.value == schemaOption)
        if(!newOption){
            setWarning("Please select the schema")
            return
        }
        if(newOption && !filteredoption.some(option => option.value === newOption.value)){
            setFilteredOption([...filteredoption,newOption])
            setDropdownOption(dropdownOption.filter((option)=>option.value !== newOption.value ))
        };
        
    }

    // called when the user clicks the minus button
    const handleDelete = (indexToRemove)=>{
        const updatedOptions = filteredoption.filter((_, index) => index !== indexToRemove);
        setFilteredOption(updatedOptions); 
        const removedOption = filteredoption[indexToRemove];
        setDropdownOption([...dropdownOption, removedOption]);
    }
 
    const handleSave = async()=>{
        
        if(!segment || !filteredoption){
            setWarning('Please Enter all the fields');
            return;
        }
        setWarning('');

        const payload = {
            "segment name": segment,
            "schema": filteredoption
        };

          console.log('result',payload)
        try{
            const response = await fetch('https://webhook.site/c69349eb-ceaf-4566-a621-5e5915c3ff08', 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                }
            );
        }catch(err){
                setWarning("server Error")
        }
    }
  
     
  return (
    <div className='popupContainer'>
        <Header text='Saving Segment'/>
        <div className='inputContainer'>
            <label htmlFor="segment">Enter the name of the Segment</label>
            <input type="text" name="segment" 
                placeholder='Name of the segment'
                onChange={e=>setSegment(e.target.value)} />
        </div>

        {/* Dropdown stack */}
       <div className={`dropdownStack ${filteredoption.length > 0 ? 'hasData' : ''}`}>
            {filteredoption && 
                filteredoption.map((data, index) => (
                    <div className='newDropdown' key={index}>
                        <FontAwesomeIcon icon={faCircle} color={data?.color} />
                        <select 
                            value={data.value}
                            onChange={(e) => handleDropdown(e.target.value)}>
                            <option value={data.value}>{data.label}</option> 

                            {unSelectedoptions && unSelectedoptions
                                .filter(option => option.value !== data.value)
                                .map((option) => (
                                    <option value={option.value} key={option.value}>
                                        {option.label}
                                    </option>
                            ))}
                        </select>
                        <FontAwesomeIcon icon={faCircleMinus} 
                            style={{color:'#6dcbe8', fontSize:'30px'}}
                            onClick={() => handleDelete(index)} />
                    </div>
                ))
            }
        </div>

        {/* Main Dropdown */}
        <div className='mainDropdownContainer'>
            <div className='dropdownContainer'>
                <FontAwesomeIcon icon={faCircle} style={{color:'gray'}}/>
                <Dropdown handleChange = {handleDropdown} 
                    options = {dropdownOption} />
                <FontAwesomeIcon icon={faCircleMinus} 
                    style={{color:'#6dcbe8',fontSize:'30px'}}/>
            </div>
            <div className='linkContainer'>
                <a onClick={handleClick}>+Add new schema</a>
            </div>
        </div>

        {/* Warning */}
        {warning &&
            <div className='warningContainer'>
                <Warning warning={warning}/>
            </div>
        }

        {/* Footer */}
        <div className='popupFooter'>
            <button 
                style={{background:'#24bdad',color:'white'}} 
                onClick={handleSave}>Save the Segment</button>
            <button style={{background:'white',color:'red'}}>Cancel</button>
        </div>
        
    </div>
  )
}

export default Popup