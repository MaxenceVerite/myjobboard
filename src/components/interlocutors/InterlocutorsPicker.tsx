  import React, { useEffect, useState } from "react";
  import { useSelector, useDispatch } from "react-redux";
  import {
    getInterlocutors,
    createInterlocutor,
  } from "../../store/slices/interlocutorSlice";
  import Autocomplete from "@mui/material/Autocomplete";
  import TextField from "@mui/material/TextField";
  import Button from "@mui/material/Button";
  import Interlocutor from "../../models/opportunities/Interlocutor";
  import { RootState } from "../../store/store";
  import { Paper } from "@mui/material";
  import { Add } from "@mui/icons-material";

  interface InterlocutorsPickerProps {
    companyId?: string;
    preselectedInterlocutors?: string[];
    onInterlocutorsSelectionChange: (interlocutors: Interlocutor[]) => void;
  }

  const InterlocutorsPicker = ({
    companyId,
    preselectedInterlocutors,
    onInterlocutorsSelectionChange,
  }: InterlocutorsPickerProps) => {
    const [inputValue, setInputValue] = useState("");

    const interlocutors = useSelector(
      (state: RootState) => state.interlocutors.interlocutors
    );  
    const preselected = interlocutors.filter((q) =>
      preselectedInterlocutors?.includes(q.id!)
    );

    const [selectedInterlocutors, setSelectedInterlocutors] = useState<
      Interlocutor[]
    >(preselected ?? []);

    const dispatch = useDispatch<any>();

    useEffect(() => {
      dispatch(getInterlocutors());
    }, [dispatch]);

    const handleInputChange = (
      event: React.SyntheticEvent,
      newInputValue: string
    ) => {
      setInputValue(newInputValue);
    };

    const handleSubmitInterlocutor = async () => {
      const newInterlocutor: Interlocutor = {
        companyId: companyId!,
        firstName: inputValue,
        lastName: "",
      };
      const resultAction = await dispatch(
        createInterlocutor({ interlocutor: newInterlocutor })
      );
      if (createInterlocutor.fulfilled.match(resultAction)) {
        const createdInterlocutor = resultAction.payload;
        setSelectedInterlocutors([...selectedInterlocutors, createdInterlocutor]);
        setInputValue("");
        onInterlocutorsSelectionChange([
          ...selectedInterlocutors,
          createdInterlocutor,
        ]);
      }
    };

    return (
      <>

          <Autocomplete
            multiple
            value={selectedInterlocutors}
            onChange={(event, newValue) => {
              setSelectedInterlocutors(newValue);
              onInterlocutorsSelectionChange(newValue);
            }}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            options={interlocutors}
            getOptionLabel={(option) => `${option.lastName}, ${option.firstName}`}
            renderInput={(params) => (
              <TextField  margin="normal" {...params} label="Interlocutors" variant="standard" />
            )}
            renderOption={(props, option) => (
              <li {...props}>{`${option.lastName}, ${option.firstName}`}</li>
            )}
          />
          <Button fullWidth onClick={handleSubmitInterlocutor} startIcon={<Add/>}>
            
          </Button>
      </>
    );
  };

  export default InterlocutorsPicker;
