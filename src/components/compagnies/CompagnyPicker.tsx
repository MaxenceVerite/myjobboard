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
  const [openDialog, setOpenDialog] = useState(false);

  const companies = useSelector((state: RootState) => state.companies.companies);

  const dispatch = useDispatch<any>();

  useEffect(()=> {
     dispatch(getCompanies());
  }, [dispatch])

  const handleInputChange = (event: React.SyntheticEvent, newInputValue: string) => {
    setInputValue(newInputValue);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmitCompany = () => {
    dispatch(createCompany({company: {name: inputValue}}))
    handleCloseDialog();
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
            handleOpenDialog();
          } else {
            const selectedCompany = companies.find((company) => company.name === newValue);
            onCompanySelect(selectedCompany?.id!);
          }
        }}
      />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Création d'une nouvelle entreprise</DialogTitle>
        <DialogContent>
         L'entreprise "{inputValue}" va être crée. Confirmer?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleSubmitCompany} color="primary">Valider</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CompanyPicker;
