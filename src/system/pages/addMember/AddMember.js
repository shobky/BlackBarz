import React, { useEffect, useState } from 'react'
import Nav from '../../components/nav/Nav'
import './addMember.css'
import { uuidv4 } from "@firebase/util";
import { collection, doc, FieldValue, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase/Config';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { HiOutlineCheck } from 'react-icons/hi';
import { MdOutlineClose } from 'react-icons/md';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuth } from '../../../contexts/AuthContext';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };


// const daysLs = [
//     'Friday',
//     'Saturday',
//     'Sunday',
//     'Monday',
//     'Tuesday',
//     'WednesDay',
//     'ThrusDay'
// ];
// const hoursLs = ["1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12pm", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12am"]

const AddMember = () => {
    const plansQuery = collection(db, `plans`)
    const [firestorePlans] = useCollectionData(plansQuery)
    const trainersQuery = collection(db, `trainers`)
    const [firestoretrainers] = useCollectionData(trainersQuery)

    const [memberID, setMemberId] = useState()
    const [msDay, setMsDay] = useState()
    const [msMonth, setMsMonth] = useState()
    const [msYear, setMsYear] = useState()

    const [msg, setMsg] = useState('')
    const [error, setError] = useState('')

    const [mail, setMail] = useState('')
    const [number, setNumber] = useState('')
    const [name, setName] = useState('')

    const [payment, setPayment] = useState('full');
    const [Trainer, setTrainer] = useState('0');
    const [workType, setWorkType] = useState('0');
    const [currentdate, setCurrentDate] = useState()

    

    const [selectedPlan, setSelectedPlan] = useState('');

    const handleChangeWorkType = (event) => {
        setWorkType(event.target.value);
    };
    const handleChangeTriner = (event) => {
        setTrainer(event.target.value);
    };

    const handleChangePayment = (event) => {
        setPayment(event.target.value);
    };

    const handleChangePlan = (event) => {
        const selectedPlanName = event.target.value;
        // Find the selected plan object in the plans array using the selected plan name
        const selectedPlan = firestorePlans?.find((plan) => plan.name === selectedPlanName);
        setSelectedPlan(selectedPlan);
    };

    useEffect(() => {
        setMemberId(uuidv4().slice(0, 4))
        return
    }, [])

    useEffect(() => {
        const getdate = () => {
            const currentdate = new Date();
            setMsDay(currentdate.getDate())
            setMsMonth(currentdate.getMonth() + 1)
            setMsYear(currentdate.getFullYear())
            setCurrentDate(currentdate)
        }
        getdate()
        return
    }, [])

    const onAddMember = async (e) => {
        setError('')
        e.preventDefault()
        if (mail.length < 1) {
            setError('Please type email adress!')
            return
        } else if (name.length < 1) {
            setError('Please type member name!')
            return
        } else if (number.length < 1) {
            setError('Please type member number!')
            return
        }
        setDoc(doc(db, `members`, mail), {
            name: name,
            number: number,
            email: mail,
            mid: memberID,
            memberShipDate: {
                day: msDay,
                month: msMonth,
                msYear: msYear
            },
            session: 0,
            plan: selectedPlan,
            type: workType,
            trainer: Trainer,
            lastPaid: payment === 'full' ? {
                day: msDay,
                month: msMonth,
                year: msYear
            } : null
        }).then(() => {
            if (payment === 'full') {
                setDoc(doc(db, `payments/months/${msMonth}`, mail), {
                    name: name,
                    number: number,
                    email: mail,
                    mid: memberID,
                    plan: selectedPlan,
                    fees: selectedPlan.price,
                    trainer: Trainer,
                    lastPaid: {
                        day: msDay,
                        month: msMonth,
                        year: msYear
                    }
                })
            }
            setMsg('member added successfully ')
        }).catch((err) => {
            setMsg('')
            setError(err.message)
        })


    }

    return (
        <div className='add-member'>
            <Nav page="addMember" />
            <br />
            {error && <p className='add-member-eorr-ms'>{error}</p>}
            {msg && <p className='add-member-msg-ms'>{msg}</p>}

            <main className='add-member_main'>
                <form>
                    <p className='add-member_main_form_mid'>Member Id,  <span>#{memberID}</span></p>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: '15px', width: '30ch', display: "flex", flexDirection: "column" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <FormControl style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                            <TextField onChange={(e) => setName(e.target.value)} required sx={{ width: ' 25ch' }} id="outlined-basic" label="Name" variant="outlined" />
                            <TextField onChange={(e) => setNumber(e.target.value)} type="tel" required id="outlined-basic" label="Number" variant="outlined" />
                        </FormControl>
                        <div style={{ display: "flex", flexDirection: "row", gap: "0px", width: "100%", alignItems: "center" }}>

                            <TextField onChange={(e) => setMail(e.target.value)} type="email" required sx={{ width: '15ch' }} id="outlined-basic" label="Gmail" variant="outlined" />
                            <FormControl sx={{ m: 1, width: "14.3ch" }}>
                                <InputLabel sx={{ width: "fit-content" }} id="demo-simple-select-helper-label">Trainer</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={Trainer}
                                    label="Trainer"
                                    onChange={handleChangeTriner}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        firestoretrainers?.map((firestoretrainer) => (
                                            <MenuItem key={firestoretrainer.name} value={firestoretrainer.name}> Captain {firestoretrainer.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <FormControl sx={{ m: 1 }}>
                            <InputLabel sx={{ width: "fit-content" }} id="demo-simple-select-helper-label">Workout type</InputLabel>
                            <Select
                                required
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={workType}
                                label="Workout type"
                                onChange={handleChangeWorkType}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'Lefteing'}> Lefting </MenuItem>
                                <MenuItem value={'CrossFit'}> CrossFit</MenuItem>
                                <MenuItem value={'Street'}> Street </MenuItem>
                                <MenuItem value={'Cardio'}> Cardio </MenuItem>

                            </Select>
                        </FormControl>

                    </Box>


                    <div style={{ marginLeft: "20px", marginTop: "20px" }}>
                        <FormLabel id="demo-controlled-radio-buttons-group">Workout Plan</FormLabel>
                        <br />
                        <select className='add-member-from_select-plan' value={selectedPlan.name} onChange={handleChangePlan}>
                            {firestorePlans?.map((plan) => (
                                <option className='add-member-from_select-plan__option' key={plan.name} value={`${plan.name}`}>
                                    {`${plan.name}: ${plan.sessions}x ${plan.price}l.e`}
                                </option>
                            ))}
                        </select>

                        <div style={{ marginTop: "20px" }}>
                            <FormLabel id="demo-controlled-radio-buttons-group">Payment</FormLabel>
                            <RadioGroup
                                required
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={payment}
                                onChange={handleChangePayment}

                            >
                                <div style={{ display: "flex" }}>
                                    <FormControlLabel sx={{ color: "black", fontWeight: "bold" }} value="full" control={<Radio />} label="Full" />
                                    <FormControlLabel sx={{ color: "black", fontWeight: "bold" }} value="none" control={<Radio />} label="None" />
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className='add-member_form_actions'>
                        <button type="button" className='add-member-submit-btn__cancel'><MdOutlineClose /></button>
                        <button type='button' onClick={(e) => onAddMember(e)} className='add-member-submit-btn'><HiOutlineCheck /></button>
                    </div>
                </form>

            </main>
        </div >
    )
}

export default AddMember
