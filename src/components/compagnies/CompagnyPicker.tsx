import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanies, createCompany } from '../../store/slices/companySlice';
import { RootState } from '../../store/store';
import { useTranslation } from 'react-i18next';
import Company from '../../models/opportunities/Company';

interface CompanyPickerProps {
  onCompanySelect: (companyId: string) => void;
  defaultCompanyId?: string;
}

const CompanyPicker = ({ onCompanySelect, defaultCompanyId }: CompanyPickerProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<any>();
  const companies = useSelector((state: RootState) => state.companies.companies);
  const [inputValue, setInputValue] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  useEffect(() => {
    dispatch(getCompanies());
    if (defaultCompanyId) {
      const defaultCompany = companies.find(company => company.id === defaultCompanyId);
      setSelectedCompany(defaultCompany || null);
    }
  }, [dispatch, defaultCompanyId]);

  const handleInputChange = (_, newInputValue) => {
    setInputValue(newInputValue);
    setSelectedCompany(null);
  };

  const handleOptionSelect = async (event: any, newValue: any) => {
    
    if (newValue && newValue.inputValue) {
      const resultAction = await dispatch(createCompany({company: { name: newValue.inputValue }}));
      if (createCompany.fulfilled.match(resultAction)) {
        const newCompany = resultAction.payload;
        onCompanySelect(newCompany.id!);
        setSelectedCompany(newCompany);
        setInputValue(newCompany.name);
      }
    } else {
      onCompanySelect(newValue.id);
      setSelectedCompany(newValue);
    }
  };

  return (
    <Autocomplete
      value={selectedCompany}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleOptionSelect}
      options={companies}
      getOptionLabel={(option) => option.name}
      filterOptions={(options, params) => {
        const filtered = options.filter(option => option.name.toLowerCase().includes(params.inputValue.toLowerCase()));
        
        if (params.inputValue !== '' && !filtered.some(option => option.name.toLowerCase() === params.inputValue.toLowerCase())) {
          return [...filtered, { inputValue: params.inputValue, name: `${t('Créer')} "${params.inputValue}"` }];
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      renderInput={(params) => <TextField margin="normal" {...params} placeholder={t('Entreprise')} variant="standard" />}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      isOptionEqualToValue={(option, value) => option.id === value.id}
    />
  );
};

export default CompanyPicker;
