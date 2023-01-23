import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import './addDayWorkout.css'
import { db } from '../../../firebase/Config';
import CollectionViewer from '../../../components/viewDayWorkouts/ViewDayWorkotus';
import Nav from '../../components/nav/Nav';

const CollectionEditor = () => {
    const [collectionName, setCollectionName] = useState('gain');
    const [documents, setDocuments] = useState([{ name: '', strings: [] }]);

    const handleCollectionNameChange = event => {
        setCollectionName(event.target.value);
    };

    const handleDocumentNameChange = (index, event) => {
        const newDocuments = [...documents];
        newDocuments[index].name = event.target.value;
        setDocuments(newDocuments);
    };

    const handleDocumentStringsChange = (index, event) => {
        const newDocuments = [...documents];
        newDocuments[index].strings = event.target.value.split(',');
        setDocuments(newDocuments);
    };

    const handleAddDocument = () => {
        setDocuments([...documents, { name: '', strings: [] }]);
    };

    const handleRemoveDocument = index => {
        setDocuments(documents.filter((doc, i) => i !== index));
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            documents.forEach(async document => {
                await setDoc(doc(db, `${collectionName}/${document.name}`), document)
                // await collectionRef.add(document);
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Nav />
            <div className='add_workout-page'>
                <form
                    className='add_workout-form' onSubmit={handleSubmit}>
                    <label className='add-workout-collection-name'>
                        Collection Name
                        <select className='add-workout-collection-select' value={collectionName} onChange={handleCollectionNameChange}>
                            <option value="gain">Gain</option>
                            <option value="loss">Loss</option>
                        </select>
                    </label>
                    <div className='add-worktous-form-overFlow'>

                        {documents.map((document, index) => (
                            <div className='add-workout-day_forms-input' key={index}>
                                <div className='add-workout-day_form_input__singular'>
                                    <label className='add-workout-day_label'>
                                        <input
                                            placeholder='Name'
                                            className='add-workout-day_input'
                                            type="text"
                                            value={document.name}
                                            onChange={event => handleDocumentNameChange(index, event)}
                                        />
                                    </label>
                                    <label className='add-workout-day_label'>
                                        <input
                                            placeholder='Workout 1, 2, 3 ...'
                                            className='add-workout-day_input'
                                            type="text"
                                            value={document.strings.join(',')}
                                            onChange={event => handleDocumentStringsChange(index, event)}
                                        />
                                    </label>
                                </div>
                                <button className='add-workout-remove-btn' type="button" onClick={() => handleRemoveDocument(index)}>
                                    Remov
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className='add-day-workout_btns'>
                        <button className='add-day-wrokout_btn adw_add-btn' type="button" onClick={handleAddDocument}>
                            Add New
                        </button>
                        <button className='add-day-wrokout_btn adw_save-btn' type="submit">Save Changes</button>
                    </div>
                </form>


                <div className='add-day-workout_view-day-workout'>
                    <CollectionViewer collectionName={collectionName} />
                </div>
            </div>
        </>
    );
};

export default CollectionEditor;
