import React from 'react';

const EditTrTable = ({ trainers, onChange }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th className='th-head-up'>Trainer</th>
                    <th className='th-head-up'>MON</th>
                    <th className='th-head-up'>TUES</th>
                    <th className='th-head-up'>WED</th>
                    <th className='th-head-up'>THU</th>
                    <th className='th-head-up'>FRI</th>
                    <th className='th-head-up'>SAT</th>
                    <th className='th-head-up'>SUN</th>
                </tr>
            </thead>
            <tbody>
                {trainers?.map((trainer, i) => (
                    <tr key={i}>
                        <td className='input-holder'>
                            <input
                                disabled={true}
                                type="text"
                                value={trainer.name}
                                onChange={(e) => onChange(e, i, 'name')}
                            />
                        </td>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, j) => (
                            <td key={j}>
                                {trainer[day].map((session, k) => (
                                    <input
                                        type="text"
                                        value={session}
                                        onChange={(e) => onChange(e, i, day, k)}
                                        key={k}
                                        className={session === '00-00' ? 'sch-edit_emptyInput' : ""}

                                    />
                                ))}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EditTrTable;
