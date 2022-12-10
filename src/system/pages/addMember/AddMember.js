import React, { useEffect, useState } from 'react'
import Nav from '../../components/nav/Nav'
import './addMember.css'
import { uuidv4 } from "@firebase/util";
import { collection, doc, setDoc } from 'firebase/firestore';
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
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { HiOutlineCheck } from 'react-icons/hi';
import { MdOutlineClose } from 'react-icons/md';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const daysLs = [
    'Friday',
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'WednesDay',
    'ThrusDay'
];
const hoursLs = ["1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12pm", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12am"]

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
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')



    const [gender, setGender] = useState('female');
    const [plan, setPlan] = useState('12');
    const [Trainer, setTrainer] = useState('0');
    const [workType, setWorkType] = useState('0');
    const [city, setCity] = useState([]);
    const [days, setDays] = useState([]);
    const [hours, setHours] = useState([]);




    console.log({
        // name: nameRef.current.value ?? "",
        // number: numberRef.current.value ?? "",
        // mail: mailRef.current.value ?? "",
        gender,
        plan,
        workType,
        Trainer,
        favs: {
            days,
            hours,
            city
        },
        // weight: weightRef.current.value ?? "",
        // height: heightRef.current.value ?? ""

    })

    const handleChangeWorkType = (event) => {
        setWorkType(event.target.value);
    };
    const handleChangeTriner = (event) => {
        setTrainer(event.target.value);
    };

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };

    const handleChangePlan = (event) => {
        setPlan(event.target.value);
    };

    const handleChangeCity = (event) => {
        const {
            target: { value },
        } = event;
        setCity(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChangeDays = (event) => {
        const {
            target: { value },
        } = event;
        setDays(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleChangeHours = (event) => {
        const {
            target: { value },
        } = event;
        setHours(
            // On autofill we get a stringified hours.
            typeof value === 'string' ? value.split(',') : value,
        );
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
            height: height,
            weight:weight,
            type: workType,
            trainer: Trainer,
            plan: plan,
            name: name,
            number: number,
            gender: gender,
            email: mail,
            mid: memberID,
            memberShipDate: {
                day: msDay,
                month: msMonth,
                msYear: msYear
            },
            favs: {
                days: days,
                hours: hours,
                city: city
            },
            checked: true,
            session: 1,
            paymentmonth:msMonth,
            paymentday: msDay
        }).then(() => {
            alert('member added successfully ')
            // navigate(`/dashboard/find-member/${mail.current.value}`)
            // document.getElementById('addMemberForm').reset()
        }).catch((err) => {
            setMsg('')
            setError('something went wrong, try again')
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

                            <TextField onChange={(e) => setMail(e.target.value)} type="email" required  sx={{ width: '15ch' }} id="outlined-basic" label="Gmail" variant="outlined" />
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

                        <FormControl style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                            <TextField required onChange={(e) => setWeight(e.target.value)} sx={{ width: ' 20ch' }} id="outlined-basic" label="Weight" variant="outlined" />
                            <TextField required onChange={(e) => setHeight(e.target.value)} id="outlined-basic" label="Height" variant="outlined" />
                        </FormControl>

                        <div style={{ display: 'flex', flexDirection: "row", gap: " 10px" }}>
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

                        </div>

                    </Box>

                    <div style={{ marginLeft: "20px", marginTop: "20px" }}>
                        <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                        <RadioGroup
                            required
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={gender}
                            onChange={handleChangeGender}

                        >
                            <div style={{ display: "flex" }}>
                                <FormControlLabel sx={{ color: "black", fontWeight: "bold" }} value="female" control={<Radio />} label="Female" />
                                <FormControlLabel sx={{ color: "black", fontWeight: "bold" }} value="male" control={<Radio />} label="Male" />
                            </div>
                        </RadioGroup>
                    </div>
                    <div style={{ marginLeft: "20px", marginTop: "20px" }}>
                        <FormLabel id="demo-controlled-radio-buttons-group">Workout Plan</FormLabel>
                        <RadioGroup
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
                                {/* <FormControlLabel sx={{ color: "black", fontWeight: "bold" }} value="12" control={<Radio />} label="12" />
                                <FormControlLabel sx={{ color: "black", fontWeight: "bold" }} value="24" control={<Radio />} label="24" /> */}
                            </div>
                        </RadioGroup>
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


