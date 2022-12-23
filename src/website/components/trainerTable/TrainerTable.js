import React from 'react';

const TrainerTable = ({ trainers }) => {
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
                                type="text"
                                disabled={true}
                                value={trainer.name}
                            />
                        </td>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, j) => (
                            <td  key={j}>
                                {trainer[day].map((session, k) => (
                                    <div className='sch_input_div'>
                                        <input
                                            disabled={true}
                                            type="text"
                                            value={session}
                                            key={k}
                                            className={session === '00-00' ? 'sch_emptyInput' : ""}
                                        />
                                    </div>
                                ))}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TrainerTable;
