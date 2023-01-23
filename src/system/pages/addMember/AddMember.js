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
    // const [weight, setWeight] = useState('')
    // const [height, setHeight] = useState('')



    const [payment, setPayment] = useState('full');
    const [plan, setPlan] = useState('12');
    const [Trainer, setTrainer] = useState('0');
    const [workType, setWorkType] = useState('0');
    // const [city, setCity] = useState([]);
    // const [days, setDays] = useState([]);
    // const [hours, setHours] = useState([]);

    const { city } = useAuth()


    const [selectedPlan, setSelectedPlan] = useState(firestorePlans ?? [0]);

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

    // const handleChangePlan = (event) => {
    //     setPlan(event.target.value);
    // };

    // const handleChangeCity = (event) => {
    //     const {
    //         target: { value },
    //     } = event;
    //     setCity(
    //         // On autofill we get a stringified value.
    //         typeof value === 'string' ? value.split(',') : value,
    //     );
    // };

    // const handleChangeDays = (event) => {
    //     const {
    //         target: { value },
    //     } = event;
    //     setDays(
    //         // On autofill we get a stringified value.
    //         typeof value === 'string' ? value.split(',') : value,
    //     );
    // };
    // const handleChangeHours = (event) => {
    //     const {
    //         target: { value },
    //     } = event;
    //     setHours(
    //         // On autofill we get a stringified hours.
    //         typeof value === 'string' ? value.split(',') : value,
    //     );
    // };

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
            <main className='add-member_main'>
                {/* <div className='add-member_photo-sectoin'>
                        <img className='add-member_main_form_img' src={photoURL} alt="profile-pix" />
                        <input onChange={(e) => handleImgChange(e.target.files[0])} className='add-member_change-photo-input' type='file' />
                        <FiEdit className='add-member_change-photo_ico' />
                        <p className='add-member_main_form-error'>{error && error}</p>
                        <p className='add-member_main_form-msg'>{msg && msg}</p>

                    </div> */}
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

                        {/* <FormControl style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                            <TextField required onChange={(e) => setWeight(e.target.value)} sx={{ width: ' 20ch' }} id="outlined-basic" label="Weight" variant="outlined" />
                            <TextField required onChange={(e) => setHeight(e.target.value)} id="outlined-basic" label="Height" variant="outlined" />
                        </FormControl> */}

                        {/* <div style={{ display: 'flex', flexDirection: "row", gap: " 10px" }}>
                            <FormControl sx={{ width: '17ch' }}>
                                <InputLabel htmlFor="grouped-native-select">City</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={city}
                                    label="City"
                                    onChange={handleChangeCity}>
                                    <MenuItem value={'Portsaid'}> Portsaid </MenuItem>
                                    <MenuItem value={'Portfouad'}> Portfouad </MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ width: '25ch' }}>
                                <InputLabel id="demo-multiple-checkbox-label">Days</InputLabel>
                                <Select
                                    required
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={days}
                                    onChange={handleChangeDays}
                                    input={<OutlinedInput label="Days" />}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {daysLs.map((day) => (
                                        <MenuItem key={day} value={day}>
                                            <Checkbox checked={days.indexOf(day) > -1} />
                                            <ListItemText primary={day} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ width: '18ch' }}>
                                <InputLabel htmlFor="grouped-select">Time</InputLabel>
                                <Select
                                    required
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={hours}
                                    onChange={handleChangeHours}
                                    input={<OutlinedInput label="Time" />}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {hoursLs.map((hour) => (
                                        <MenuItem key={hour} value={hour}>
                                            <Checkbox checked={hours.indexOf(hour) > -1} />
                                            <ListItemText primary={hour} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                        </div> */}

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




{/* <RadioGroup
required
aria-labelledby="demo-controlled-radio-buttons-group"
name="controlled-radio-buttons-group"
value={plan}
onChange={handleChangePlan}

>
<div style={{ display: "flex" }}>
    {
        firestorePlans?.map((firestorePlan, index) => (
            <div className='add-members_plans' key={index}>
                <FormControlLabel sx={{ color: "black", fontWeight: "bold" }} value={firestorePlan.type} control={<Radio />} label={firestorePlan.type} />
                <p className='add-members_plan-price'>{firestorePlan.price}l.e</p>
            </div>
        ))
    }
   
</div>
</RadioGroup> */}
{/* <FormControlLabel sx={{ color: "black", fontWeight: "bold" }} value="12" control={<Radio />} label="12" />
    <FormControlLabel sx={{ color: "black", fontWeight: "bold" }} value="24" control={<Radio />} label="24" /> */}