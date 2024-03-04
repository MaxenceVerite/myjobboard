import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Company from '../../models/opportunities/Company';
import { createCompany, getCompanies } from '../../store/slices/companySlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface CompanyPickerProps {
  onCompanySelect: (companyId: string) => void;
}

const CompanyPicker = ({ onCompanySelect }: CompanyPickerProps) => {
  const [inputValue, setInputValue] = useState('');

  const companies = useSelector((state: RootState) => state.companies.companies);

  const dispatch = useDispatch<any>();

  useEffect(()=> {
     dispatch(getCompanies());
  }, [dispatch])

  const handleInputChange = (event: React.SyntheticEvent, newInputValue: string) => {
    setInputValue(newInputValue);
  };


  const handleSubmitCompany = () => {
    dispatch(createCompany({company: {name: inputValue}}))
  };

  return (
    <>
      <Autocomplete
        
        freeSolo
        value={inputValue}
        onInputChange={handleInputChange}
        options={companies.map((company) => company.name)}
        filterOptions={(options, params) => {
          const filtered = options.filter((option) => option.includes(params.inputValue));
       
          if (params.inputValue !== '' && !filtered.includes(params.inputValue)) {
            filtered.push(`Créer "${params.inputValue}"`);
          }
          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderInput={(params) => <TextField {...params} label="Entreprise" />}
        onChange={(event, newValue) => {
          if (newValue === `Créer "${inputValue}"`) {
            setInputValue(inputValue);
            handleSubmitCompany();
          } else {
            const selectedCompany = companies.find((company) => company.name === newValue);
            onCompanySelect(selectedCompany?.id!);
          }
        }}
      />
    </>
  );
};

export default CompanyPicker;
